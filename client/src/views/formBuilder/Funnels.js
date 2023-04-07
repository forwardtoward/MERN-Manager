import React from 'react';
import { useSelector } from 'react-redux';

import { TabContent, TabPane } from 'reactstrap';

// ** CUSTOME COMPONENTS
import FunnelTable from './list/FunnelTable';
import Sidebar from './list/Sidebar';

export default function Funnels({active,setActive,dispatch}) {
    const store = useSelector(state=>state.formEditor);

  return (
    <div className="tasks-border">
      <Sidebar active={active} setActive={setActive} dispatch={dispatch}/>
      <div className="tasks-area" style={{ maxWidth: '100%', width: '100%' }}>
        <TabContent activeTab={active}>
          <TabPane tabId="1">
            <FunnelTable active={active} store={store} dispatch={dispatch}/>
          </TabPane>
          <TabPane tabId="2">
            <FunnelTable active={active} store={store} dispatch={dispatch}/>
          </TabPane>
          <TabPane tabId="3">
            {/* <FunnelTable active={active} store={store}/> */}
          </TabPane>
          <TabPane tabId="4">
          <FunnelTable active={active} store={store} dispatch={dispatch}/>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
}
