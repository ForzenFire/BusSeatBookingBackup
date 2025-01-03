import React from 'react'
import { MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';

function Driver() {
  return (
    <>
      <MDBRow>
        <MDBCol>
          <MDBInput id='form10Example1' label='NIC' />
        </MDBCol>
        <MDBCol>
          <MDBInput id='form10Example2' label='Full Name' type='name' />
        </MDBCol>
      </MDBRow>

      <hr />

      <MDBRow>
        <MDBCol>
          <MDBInput id='form10Example3' label='Contact' />
        </MDBCol>
        <MDBCol>
          <MDBInput id='form10Example4' label='Address' />
        </MDBCol>
      </MDBRow>
    </>
  )
}

export default Driver
