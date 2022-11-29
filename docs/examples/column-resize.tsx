/* eslint-disable @typescript-eslint/no-use-before-define */
import type { ColumnType } from '@/interface';
import Table from 'rc-table';
import { useEffect, useState } from 'react';
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
    return <th {...restProps} style={{ background: '#eff3ff' }} />;
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
  const sortData = v => {
    return TBODY_MOCKING.sort((a, b) => v * a.device.model.localeCompare(b.device.model));
  };

  const [state, setState] = useState<any>({ columns: [] });
  const [body, setBody] = useState<any>({});
  const [sort, setSort] = useState(false);

  const initData = {
    columns: [
      { title: '', dataIndex: 'ckeck', key: 'ckeck', className: 'tblColumn', width: 50 },
      { title: '', dataIndex: 'icon', key: 'icon', className: 'icon', width: 50 },
      {
        title: (
          <div id="device" onClick={() => setSort(prev => !prev)}>
            Device
          </div>
        ),
        dataIndex: 'a',
        key: 'a',
        width: 100,
      },
      {
        title: <div>Version</div>,
        dataIndex: 'b',
        key: 'b',
        width: 100,
      },
      {
        title: <div>API Level</div>,
        dataIndex: 'c',
        key: 'c',
        width: 200,
      },
      {
        title: <div>Resolution</div>,
        dataIndex: 'd',
        key: 'd',
        width: 200,
      },
      { title: <div>Pixel Ratio</div>, dataIndex: 'e', key: 'e' },
    ],
  };

  useEffect(() => {
    setState(initData);
  }, []);

  useEffect(() => {
    if (sort) {
      setBody(makeBody(sortData(-1)));
    } else {
      setBody(makeBody(sortData(1)));
    }
  }, [sort]);

  const BodyRow = styled.tr`
    & td {
      /* display: flex;
      justify-content: center; */
      padding: 16px 0px;
      text-align: center;
    }
  `;

  const components = {
    header: {
      // row: HeaderRow,
      cell: ResizableTitle,
    },
    body: {
      row: BodyRow,
    },
  };

  const makeBody = tbody => {
    return tbody.map(v => {
      return {
        ckeck: (
          <Cell
            style={{
              border: '2px solid #e1e1e1',
              padding: '0px',
              width: '20px',
              height: '20px',
              margin: 'auto',
            }}
          />
        ),
        a: (
          <Cell style={{ borderRight: '2px solid #e1e1e1', padding: '0px' }}>{v.device.model}</Cell>
        ),
        b: (
          <Cell
            style={{ borderRight: '2px solid #e1e1e1', padding: '0px' }}
            onClick={() => console.log('222')}
          >
            {v.device.version}
          </Cell>
        ),
        c: (
          <Cell style={{ borderRight: '2px solid #e1e1e1', padding: '0px' }}>
            {v.device.apiLevel}
          </Cell>
        ),
        d: (
          <Cell
            style={{ borderRight: '2px solid #e1e1e1', padding: '0px' }}
          >{`${v.device.resolution.height} * ${v.device.resolution.width}`}</Cell>
        ),
        e: <Cell style={{ padding: '0px' }}>{v.device.scale_factor}</Cell>,
      };
    });
  };

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

  console.log(state, 'state');
  const columns = state?.columns?.map((col, index) => ({
    ...col,
    onHeaderCell: (column: ColumnType<RecordType>) =>
      ({
        width: column.width,
        onResize: handleResize(index),
      } as any),
  }));

  if (Object.keys(body).length === 0) return <></>;

  return (
    <>
      {
        <div>
          <h2>Integrate with react-resizable</h2>
          <Table components={components} columns={columns} data={body} />
        </div>
      }
    </>
  );
};

export default Demo;

const Th = styled.th`
  /* border: 5px solid blue; */
  padding: 16px 0px !important;
  border-right: none !important;
  background: #eff3ff;

  &:nth-child(1) {
    span {
      display: none;
    }
  }
  &:nth-child(2) {
    span {
      display: none;
    }
  }

  & span {
    align-items: center;
    width: 1px;
    height: 50%;
    margin: 12px 0px;
    background: #91a0d1;

    :hover {
      height: 100%;
      margin: 0px;
      background: red;
    }
  }
`;

const Cell = styled.div``;
