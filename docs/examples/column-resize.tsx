/* eslint-disable @typescript-eslint/no-use-before-define */
import type { ColumnType } from '@/interface';
import Table from 'rc-table';
import { useState } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import styled from 'styled-components';
import '../../assets/index.less';

const TBODY_MOCKING = [
  {
    device: {
      all_use: false,
      apiLevel: 29,
      available: true,
      billing: 'free',
      cpu: 'octa-core',
      dpi: '',
      heapSize: 512,
      high_availability: 'false',
      internalStorage: 28452.163999999997,
      location: 'KR',
      manufacturer: 'SAMSUNG',
      model: 'Galaxy Wide4',
      modelNumber: 'SM-A205S',
      number_of_available: 1,
      platform: 'ANDROID',
      private_code: '',
      ram: 2790,
      resolution: {
        height: 1560,
        width: 720,
      },
      scale_factor: 1,
      screenSize: '',
      use: 'true',
      version: '10',
    },
    key: 'SAMSUNG Galaxy Wide4 / ANDROID 10',
    arn: '',
  },
  {
    device: {
      all_use: false,
      apiLevel: 30,
      available: true,
      billing: 'free',
      cpu: 'octa-core',
      dpi: '',
      heapSize: 512,
      high_availability: 'false',
      internalStorage: 119990.508,
      location: 'KR',
      manufacturer: 'SAMSUNG',
      model: 'Galaxy A51',
      modelNumber: 'SM-A516N',
      number_of_available: 1,
      platform: 'ANDROID',
      private_code: '',
      ram: 5452,
      resolution: {
        height: 2400,
        width: 1080,
      },
      scale_factor: 1,
      screenSize: '',
      use: 'true',
      version: '11',
    },
    key: 'SAMSUNG Galaxy A51 / ANDROID 11',
    arn: '',
  },
  {
    device: {
      all_use: false,
      apiLevel: 30,
      available: true,
      billing: 'free',
      cpu: 'octa-core',
      dpi: '',
      heapSize: 512,
      high_availability: 'false',
      internalStorage: 57847.06,
      location: 'KR',
      manufacturer: 'SAMSUNG',
      model: 'Galaxy A31',
      modelNumber: 'SM-A315N',
      number_of_available: 1,
      platform: 'ANDROID',
      private_code: '',
      ram: 3754,
      resolution: {
        height: 2400,
        width: 1080,
      },
      scale_factor: 1,
      screenSize: '',
      use: 'true',
      version: '11',
    },
    key: 'SAMSUNG Galaxy A31 / ANDROID 11',
    arn: '',
  },
  {
    device: {
      all_use: false,
      apiLevel: 30,
      available: true,
      billing: 'free',
      cpu: 'octa-core',
      dpi: '',
      heapSize: 512,
      high_availability: 'false',
      internalStorage: 121688.852,
      location: 'KR',
      manufacturer: 'SAMSUNG',
      model: 'Galaxy A90',
      modelNumber: 'SM-A908N',
      number_of_available: 1,
      platform: 'ANDROID',
      private_code: '',
      ram: 5504,
      resolution: {
        height: 2400,
        width: 1080,
      },
      scale_factor: 1,
      screenSize: '',
      use: 'true',
      version: '11',
    },
    key: 'SAMSUNG Galaxy A90 / ANDROID 11',
    arn: '',
  },
  {
    device: {
      all_use: false,
      apiLevel: 26,
      available: true,
      billing: 'free',
      cpu: 'octa-core',
      dpi: '',
      heapSize: 512,
      high_availability: 'false',
      internalStorage: 30372.464,
      location: 'KR',
      manufacturer: 'SAMSUNG',
      model: 'Galaxy S7',
      modelNumber: 'SM-G930S',
      number_of_available: 1,
      platform: 'ANDROID',
      private_code: '',
      ram: 3622,
      resolution: {
        height: 1920,
        width: 1080,
      },
      scale_factor: 1,
      screenSize: '',
      use: 'true',
      version: '8.0.0',
    },
    key: 'SAMSUNG Galaxy S7 / ANDROID 8.0.0',
    arn: '',
  },
];

const ResizableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <Th {...restProps} />
    </Resizable>
  );
};

interface RecordType {
  a: string;
  b?: string;
  c?: string;
  d?: number;
  key: string;
}

const Demo = () => {
  const [state, setState] = useState({
    columns: [
      { title: '', dataIndex: 'ckeck', key: 'ckeck', className: 'tblColumn', width: 50 },
      { title: '', dataIndex: 'icon', key: 'icon', className: 'icon', width: 50 },
      { title: 'Device', dataIndex: 'a', key: 'a', width: 100 },
      { title: 'Version', dataIndex: 'b', key: 'b', width: 100 },
      { title: 'API Level', dataIndex: 'c', key: 'c', width: 200 },
      { title: 'Resolution', dataIndex: 'd', key: 'd', width: 200 },
      { title: 'Pixel Ratio', dataIndex: 'e', key: 'e' },
    ],
  });

  const BodyRow = styled.tr`
    & th {
      /* transition: all 0.3s; */
    }
  `;

  const components = {
    header: {
      cell: ResizableTitle,
    },
  };

  const data = [
    { a: '123', key: '1' },
    { a: 'cdd', b: 'edd', key: '2' },
    { a: '1333', c: 'eee', d: 2, key: '3' },
  ];

  const handleResize =
    index =>
    (e, { size }) => {
      setState(({ columns }) => {
        const nextColumns = [...columns];
        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width,
        };
        return { columns: nextColumns };
      });
    };
  const columns = state.columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column: ColumnType<RecordType>) =>
      ({
        width: column.width,
        onResize: handleResize(index),
      } as any),
  }));

  return (
    <>
      {
        <div>
          <h2>Integrate with react-resizable</h2>
          <Table components={components} columns={columns} data={data} />
        </div>
      }
    </>
  );
};

export default Demo;

const Th = styled.th`
  border: 5px solid blue;

  &:nth-child(1) {
    border-right: none !important;

    span {
      display: none;
    }
  }
  &:nth-child(2) {
    span {
      display: none;
    }
  }
`;
