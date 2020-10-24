import React, { useState } from 'react';

import { Container, Row, Col } from 'reactstrap';

import './Layout.css';

const Layout: React.FC = () => {
  const [showList, setShowList] = useState<boolean>(true);

  return (
    <>
      <Container>
        <Row>
          <div onClick={() => setShowList(!showList)}>toggle</div>
        </Row>
        <Row>
          {showList && (
            <Col className="col" xs={{ size: 12, order: 'last' }} sm={{ size: 2, order: 'first' }}>
              list
            </Col>
          )}

          <Col className="col" xs={{ size: 6, order: 1 }} sm={{ size: showList ? 5 : 6, order: 2 }}>
            <Row className="Label HorizontalLabel High">High Importance</Row>
            <div className="BlockWrapper">
              <div className="Label VerticalLabel High">High Urgency</div>
              <div className="Block"></div>
            </div>
            <div className="BlockWrapper">
              <div className="Label VerticalLabel Low">Low Urgency</div>
              <div className="Block"></div>
            </div>
          </Col>
          <Col className="col" xs={{ size: 6, order: 2 }} sm={{ size: showList ? 5 : 6, order: 3 }}>
            <Row className="Label HorizontalLabel Low">Low Importance</Row>
            <div className="BlockWrapper">
              <div className="Block"></div>
              {/* <div className="Label VerticalLabel High">&nbsp;</div> */}
            </div>
            <div className="BlockWrapper">
              <div className="Block"></div>
              {/* <div className="Label VerticalLabel Low">&nbsp;</div> */}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Layout;
