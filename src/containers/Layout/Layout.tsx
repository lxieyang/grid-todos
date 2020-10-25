import React, { useState } from 'react';

import { Container, Row, Col } from 'reactstrap';

import Block from './Block/Block';
import List from './List/List';
import { ItemTypes, DropItem } from './ItemTypes';

import './react-contextmenu.css';
import './Layout.css';

const Layout: React.FC = () => {
  const [showList, setShowList] = useState<boolean>(true);

  const dropAcceptTypes = [ItemTypes.TODO];

  const handleDrop = (item: DropItem) => {
    console.log(item);
  };

  return (
    <>
      <Container>
        <Row>
          <div
            onClick={() => setShowList(!showList)}
            style={{
              width: '100%',
              textAlign: 'right',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontStyle: 'italic',
              userSelect: 'none',
            }}
          >
            Toggle List
          </div>
        </Row>
        <Row>
          {showList && (
            <Col className="col" xs={{ size: 12, order: 'last' }} md={{ size: 3, order: 'first' }}>
              <List />
            </Col>
          )}

          <Col xs={{ size: 12, order: 1 }} md={{ size: showList ? 9 : 12, order: 2 }}>
            <div className="Row">
              <div className="Label VerticalLabel High">High Urgency</div>
              <div className="SubRow">
                <div className="BlockWrapper">
                  <div className="Label HorizontalLabel High">High Importance</div>
                  <Block important={true} urgent={true} />
                </div>
                <div className="BlockWrapper">
                  <div className="Label HorizontalLabel Low">Low Importance</div>
                  <Block important={false} urgent={true} />
                </div>
              </div>
            </div>

            <div className="Row">
              <div className="Label VerticalLabel Low">Low Urgency</div>
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
