import React, {FC, useEffect, useState} from 'react';
import Menu from 'antd/es/menu';
import {NavLink, useLocation} from 'react-router-dom';

import {useChainPath} from 'hooks';

const HeaderNav: FC = () => {
  const currentChain = useChainPath();

  const url = useLocation().pathname;

  const isMainnet = currentChain === '/tnb';

  const [selectedNavlink, setSelectedNavlink] = useState(['overview']);

  useEffect(() => {
    const navLink = url.split('/')[2];
    switch (navLink) {
      case 'blocks':
      case 'transactions':
        setSelectedNavlink(['transactions']);
        break;
      case 'nodes':
        setSelectedNavlink(['nodes']);
        break;
      case 'rich-list':
        setSelectedNavlink(['rich-list']);
        break;
      case 'stats':
        setSelectedNavlink(['stats']);
        break;
      case 'faucet':
        setSelectedNavlink(['faucet']);
        break;
      default:
        setSelectedNavlink(['overview']);
        break;
    }
  }, [url]);

  const onChange = ({keyPath}: any) => {
    setSelectedNavlink(keyPath);
  };

  return (
    <Menu
      onClick={onChange}
      style={{lineHeight: '40px'}}
      theme="light"
      mode="horizontal"
      selectedKeys={selectedNavlink}
    >
      <Menu.Item style={{marginLeft: '0px'}} key="overview">
        <NavLink to={`${currentChain}`}>Overview</NavLink>
      </Menu.Item>
      <Menu.Item key="transactions">
        <NavLink to={`${currentChain}/transactions`}>Transactions</NavLink>
      </Menu.Item>
      <Menu.Item key="nodes">
        <NavLink to={`${currentChain}/nodes`}>Nodes</NavLink>
      </Menu.Item>
      {isMainnet ? (
        <>
          <Menu.Item key="rich-list">
            <NavLink to="/tnb/rich-list">Rich List</NavLink>
          </Menu.Item>
          <Menu.Item key="stats">
            <NavLink to="/tnb/stats">Stats</NavLink>
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key="faucet">
          <NavLink to="/testnet/faucet">Faucet</NavLink>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default HeaderNav;
