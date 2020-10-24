import React, { useState } from 'react';

import { Container, Row, Col } from 'reactstrap';

import Block from './Block/Block';

import './Layout.css';

const Layout: React.FC = () => {
  const [showList, setShowList] = useState<boolean>(true);

  return (
    <>
      <Container>
        <Row>
          <div onClick={() => setShowList(!showList)} style={{ textAlign: 'right' }}>
            Toggle List
          </div>
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
              <Block important={true} urgent={true} />
            </div>
            <div className="BlockWrapper">
              <div className="Label VerticalLabel Low">Low Urgency</div>
              <Block important={true} urgent={false} />
            </div>
          </Col>
          <Col className="col" xs={{ size: 6, order: 2 }} sm={{ size: showList ? 5 : 6, order: 3 }}>
            <Row className="Label HorizontalLabel Low">Low Importance</Row>
            <div className="BlockWrapper">
              <Block important={false} urgent={true} />
            </div>
            <div className="BlockWrapper">
              <Block important={false} urgent={false} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Layout;
