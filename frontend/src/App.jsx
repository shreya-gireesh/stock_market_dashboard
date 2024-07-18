import { useState } from 'react'
import GlobalMarket from './pages/GlobalMarket'
import IndianMarket from './pages/IndianMarket'
import TopCompanies from './pages/TopCompanies';
import News from './pages/RelatedNews';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import './App.css'

function App() {


  return (
    <>
    <div className='p-4'>
      <div className=''>
        <h3>Discover</h3>
      </div>
      <div >
      <Row>
        <Col md={4}>
        <div className="mb-4">
            <GlobalMarket />
        </div>
        <div>
            <News />
        </div>
        </Col>
        <Col md={4}>
          <IndianMarket/>
        </Col>
        <Col md={4}>
          <TopCompanies/>
        </Col>
      </Row>
      </div>
    </div>
      
    </>
  )
}

export default App
