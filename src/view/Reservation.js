import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Reservation() {
  const [schedule, setSchedule] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [seats, setSeats] = useState(1);
  const [message, setMessage] = useState('');
  // const [userId] = useState(localStorage.getItem('userId'));
  const [heldReservationId, setHeldReservationId] = useState(null);
  const [availableSeats, setAvailableSeats] = useState(0);
  const [heldSeats, setHeldSeats] = useState(0);
  const [confirmSeats, setConfirmedSeats] = useState(0);
  const [totalSeats, setTotalSeats] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token missing from localStorage');
      return;
    }

    axios.get('http://localhost:4000/api/schedule/',{
      headers: { Authorization: `Bearer ${token}`},
    })
      .then(response => setSchedule(response.data))
      .catch(error => console.error('Error fetching schedules', error));
  }, []);

  // const fetchSchedules = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/api/schedule');
  //     setSchedule(response.data);
  //   } catch (error) {
  //     console.error('Error fetching schedules', error);
  //   }
  // };
    
  const fetchSeatInfo = async (scheduleId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/reservations/seat-info/${scheduleId}`);
      const { availableSeats, heldSeats, confirmSeats, totalSeats } = response.data;
      setAvailableSeats(availableSeats);
      setHeldSeats(heldSeats);
      setConfirmedSeats(confirmSeats);
      setTotalSeats(totalSeats);
    } catch (error) {
      console.log('Error fetching seats info', error);
    }
  };

  const handleScheduleChange = (e) => {
    const selectedId = e.target.value;
    setSelectedSchedule(selectedId);
    if (selectedId) {
      fetchSeatInfo(selectedId);
    }
  };

  const handleReserve = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token missing from localStorage');
    }

    axios.post('http://localhost:4000/api/reservations/reserve', {
      scheduleId: selectedSchedule,
      // userId,
      seatsReserved: seats,
    },
    {
      headers: { Authorization: `Bearer ${token}`},
    })
      .then((response) => {
        setMessage(response.data.message);
        setHeldReservationId(response.data.heldReservation?._id); 
      })
      .catch(error => setMessage(error.response?.data?.message || 'Error occured'));
  };

  const handleConfirm = () => {

    if (!heldReservationId) {
      setMessage('No reservation to confirm');
      return;
    }

    const token = localStorage.getItem('token');
    axios.post('http://localhost:4000/api/reservations/confirm',
      {reservationId: heldReservationId},
      {headers: {Authorization: `Bearer ${token}`}}
    )
    .then(response => {
      setMessage(response.data.message);
      fetchSeatInfo(selectedSchedule);
    })
    .catch(error => setMessage(error.response?.data?.message || 'Error confirming while confirming.'));
  };

  return (
    <div style={ {padding: '20px'}}>
      <h1>Reserve Your Seats</h1>
      {message && <p>{message}</p>}

      <div>
        <label>Select Bus Schedule:</label>
    
        <select value={selectedSchedule} onChange={handleScheduleChange} >
          <option value="">Select a Schedule</option>
          {schedule.map(schedule => (
            <option key={schedule._id} value={schedule._id}>
              {schedule.routeId.origin} to {schedule.routeId.destination} - {new Date(schedule.routeDate).toLocaleDateString()} 
                    (Bus: {schedule.busId.busNumber})
            </option>
          ))}
        </select>
      </div>

      <div>
        <p>Total Seats: {totalSeats} </p>
        <p>Available Seats: {availableSeats} </p>
        <p>Confiremed Seats: {confirmSeats} </p>
        <p>Held Seats: {heldSeats} </p>
      </div>

      <div>
        <input type="number" value={seats} onChange={(e) => setSeats(Number(e.target.value))} min="1"/>
      </div>

      <button onClick={handleReserve}>Reserve Seats</button>
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  )
}
