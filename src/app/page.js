"use client"
import React from 'react';
import PropsDrilling from './PropsDrilling';
import { Tabs } from 'antd';
import PropsContext from './PropsContext';
import PropsRecoil from './PropsRecoil';
import AtomFamily from './AtomFamily';
import EffectAtom from './EffectAtom';
import Selector from './Selector';
import SelectorFamily from './SelectorFamily';

const Page = () => {
    const items = [
        {
            key: '1',
            label: 'Props drilling',
            children: <PropsDrilling />,
        },
        {
            key: '2',
            label: 'Props context',
            children: <PropsContext />,
        },
        {
            key: '3',
            label: 'Props Recoil',
            children: <PropsRecoil />,
        },
        {
            key: '4',
            label: 'Recoil AtomFamily',
            children: <AtomFamily />,
        },
        {
            key: '5',
            label: 'Recoil effect atoms',
            children: <EffectAtom />,
        },
        {
            key: '6',
            label: 'Recoil selector',
            children: <Selector />,
        },
        {
            key: '7',
            label: 'Recoil selector family',
            children: <SelectorFamily />,
        },
    ];
    return (
        <div>
            <Tabs defaultActiveKey="1" items={items} destroyInactiveTabPane />
        </div>
    );
}

export default Page;
