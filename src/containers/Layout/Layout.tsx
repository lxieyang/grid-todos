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
            <Col className="col" xs={{ size: 12, order: 'last' }} md={{ size: 2, order: 'first' }}>
              list
            </Col>
          )}

          <Col xs={{ size: 12, order: 1 }} md={{ size: showList ? 10 : 12, order: 2 }}>
            <div className="Row">
              <div className="Label VerticalLabel High">High Urgency</div>
              <div className="SubRow">
                <div className="BlockWrapper">
                  <div className="Label HorizontalLabel High">High Importance</div>
                  <Block important={true} urgent={true} />
                </div>
                <div className="BlockWrapper">
                  <div className="Label HorizontalLabel High">Low Importance</div>
                  <Block important={false} urgent={true} />
                </div>
              </div>
            </div>

            <div className="Row">
              <div className="Label VerticalLabel High">High Urgency</div>
              <div className="SubRow">
                <div className="BlockWrapper">
                  <Block important={true} urgent={false} />
                </div>
                <div className="BlockWrapper">
                  <Block important={false} urgent={false} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Layout;
