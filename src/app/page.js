"use client"
import { Tabs } from 'antd';
import AtomFamily from './AtomFamily';
import EffectAtom from './EffectAtom';
import PropsContext from './PropsContext';
import PropsDrilling from './PropsDrilling';
import PropsRecoil from './PropsRecoil';
import RecoilCallback from './RecoilCallback';
import Selector from './Selector';
import SelectorFamily from './SelectorFamily';
import SelectorFamilyApi from './SelectorFamilyApi';
import SelectorSet from './SelectorSet';

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
        {
            key: '8',
            label: 'Recoil selector family call api',
            children: <SelectorFamilyApi />,
        },
        {
            key: '9',
            label: 'Recoil selector family set',
            children: <SelectorSet />,
        },
        {
            key: '10',
            label: 'Recoil callback',
            children: <RecoilCallback />,
        },
    ];
    return (
        <div>
            <Tabs defaultActiveKey="1" items={items} destroyInactiveTabPane />
        </div>
    );
}

export default Page;
