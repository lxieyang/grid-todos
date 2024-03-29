import React, { useState, useEffect } from 'react';

import { Container, Row, Col } from 'reactstrap';

import Block from './Block/Block';
import List from './List/List';

import { updateListShowStatus, getCurrentUser, usersRef } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

import './react-contextmenu.css';
import './Layout.css';

const Layout: React.FC = () => {
  const [showList, setShowList] = useState<boolean>(
    localStorage.getItem('showList') ? JSON.parse(localStorage.getItem('showList') as string) : true,
  );

  useEffect(() => {
    getDoc(doc(usersRef, getCurrentUser()?.uid)).then(snapshot => {
      if (snapshot) {
        let shouldShowList = snapshot.data()?.showList;
        setShowList(shouldShowList);
        localStorage.setItem('showList', shouldShowList);
      }
    });
  }, []);

  const handleToggleList = (to: boolean) => {
    setShowList(to);
    updateListShowStatus(to);
    localStorage.setItem('showList', JSON.stringify(to));
  };

  return (
    <>
      <Container fluid="lg">
        <Row>
          <div onClick={() => handleToggleList(!showList)} className="ToggleListButton">
            toggle list
          </div>
        </Row>
        <Row>
          {showList && (
            <Col className="col" xs={{ size: 12, order: 'last' }} lg={{ size: 3, order: 'first' }}>
              <List />
            </Col>
          )}

          <Col xs={{ size: 12, order: 1 }} lg={{ size: showList ? 9 : 12, order: 2 }}>
            <div className="Row">
              <div className="Label VerticalLabel High">High Urgency</div>
              <div className="SubRow">
                <div className="BlockWrapper">
                  <div className="Label HorizontalLabel High">High Importance</div>
                  <Block important={true} urgent={true} isTodayView={true} />
                </div>
                <div className="BlockWrapper">
                  <div className="Label HorizontalLabel Low">Low Importance</div>
                  <Block important={false} urgent={true} isTodayView={true} />
                </div>
              </div>
            </div>

            <div className="Row">
              <div className="Label VerticalLabel Low">Low Urgency</div>
              <div className="SubRow">
                <div className="BlockWrapper">
                  <Block important={true} urgent={false} isTodayView={true} />
                </div>
                <div className="BlockWrapper">
                  <Block important={false} urgent={false} isTodayView={true} />
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
