import classNames from 'classnames';
import * as React from 'react';
import Cell from '../Cell';
import BodyContext from '../context/BodyContext';
import TableContext from '../context/TableContext';
import { useContextSelector } from '../ContextSelector';
import type {
  ColumnType,
  CustomizeComponent,
  GetComponentProps,
  GetRowKey,
  Key,
} from '../interface';
import { getColumnsKey } from '../utils/valueUtil';
import ExpandedRow from './ExpandedRow';

export interface BodyRowProps<RecordType> {
  record: RecordType;
  index: number;
  renderIndex: number;
  className?: string;
  style?: React.CSSProperties;
  recordKey: Key;
  expandedKeys: Set<Key>;
  rowComponent: CustomizeComponent;
  cellComponent: CustomizeComponent;
  scopeCellComponent: CustomizeComponent;
  onRow: GetComponentProps<RecordType>;
  rowExpandable: (record: RecordType) => boolean;
  indent?: number;
  rowKey: React.Key;
  getRowKey: GetRowKey<RecordType>;
  childrenColumnName: string;
}

function BodyRow<RecordType extends { children?: readonly RecordType[] }>(
  props: BodyRowProps<RecordType>,
) {
  const {
    className,
    style,
    record,
    index,
    renderIndex,
    rowKey,
    rowExpandable,
    expandedKeys,
    onRow,
    indent = 0,
    rowComponent: RowComponent,
    cellComponent,
    scopeCellComponent,
    childrenColumnName,
  } = props;
  const { prefixCls, fixedInfoList } = useContextSelector(TableContext, [
    'prefixCls',
    'fixedInfoList',
  ]);
  const {
    flattenColumns,
    expandableType,
    expandRowByClick,
    onTriggerExpand,
    rowClassName,
    expandedRowClassName,
    indentSize,
    expandIcon,
    expandedRowRender,
    expandIconColumnIndex,
  } = useContextSelector(BodyContext, [
    'flattenColumns',
    'expandableType',
    'expandRowByClick',
    'onTriggerExpand',
    'rowClassName',
    'expandedRowClassName',
    'indentSize',
    'expandIcon',
    'expandedRowRender',
    'expandIconColumnIndex',
  ]);
  const [expandRended, setExpandRended] = React.useState(false);

  const expanded = expandedKeys && expandedKeys.has(props.recordKey);

  React.useEffect(() => {
    if (expanded) {
      setExpandRended(true);
    }
  }, [expanded]);

  const rowSupportExpand = expandableType === 'row' && (!rowExpandable || rowExpandable(record));
  // Only when row is not expandable and `children` exist in record
  const nestExpandable = expandableType === 'nest';
  const hasNestChildren = childrenColumnName && record && record[childrenColumnName];
  const mergedExpandable = rowSupportExpand || nestExpandable;

  // ======================== Expandable =========================
  const onExpandRef = React.useRef(onTriggerExpand);
  onExpandRef.current = onTriggerExpand;

  const onInternalTriggerExpand = (...args: Parameters<typeof onTriggerExpand>) => {
    onExpandRef.current(...args);
  };

  // =========================== onRow ===========================
  const additionalProps = onRow?.(record, index);

  const onClick: React.MouseEventHandler<HTMLElement> = (event, ...args) => {
    if (expandRowByClick && mergedExpandable) {
      onInternalTriggerExpand(record, event);
    }

    additionalProps?.onClick?.(event, ...args);
  };

  // ======================== Base tr row ========================
  let computeRowClassName: string;
  if (typeof rowClassName === 'string') {
    computeRowClassName = rowClassName;
  } else if (typeof rowClassName === 'function') {
    computeRowClassName = rowClassName(record, index, indent);
  }

  const columnsKey = getColumnsKey(flattenColumns);
  const baseRowNode = (
    <RowComponent
      {...additionalProps}
      data-row-key={rowKey}
      className={classNames(
        className,
        `${prefixCls}-row`,
        `${prefixCls}-row-level-${indent}`,
        computeRowClassName,
        additionalProps && additionalProps.className,
      )}
      style={{
        ...style,
        ...(additionalProps ? additionalProps.style : null),
      }}
      onClick={onClick}
    >
      {flattenColumns.map((column: ColumnType<RecordType>, colIndex) => {
        const { render, dataIndex, className: columnClassName } = column;

        const key = columnsKey[colIndex];
        const fixedInfo = fixedInfoList[colIndex];

        // ============= Used for nest expandable =============
        let appendCellNode: React.ReactNode;
        if (colIndex === (expandIconColumnIndex || 0) && nestExpandable) {
          appendCellNode = (
            <>
              <span
                style={{ paddingLeft: `${indentSize * indent}px` }}
                className={`${prefixCls}-row-indent indent-level-${indent}`}
              />
              {expandIcon({
                prefixCls,
                expanded,
                expandable: hasNestChildren,
                record,
                onExpand: onInternalTriggerExpand,
              })}
            </>
          );
        }

        let additionalCellProps: React.HTMLAttributes<HTMLElement>;
        if (column.onCell) {
          additionalCellProps = column.onCell(record, index);
        }

        return (
          <Cell
            className={columnClassName}
            ellipsis={column.ellipsis}
            align={column.align}
            scope={column.rowScope}
            component={column.rowScope ? scopeCellComponent : cellComponent}
            prefixCls={prefixCls}
            key={key}
            record={record}
            index={index}
            renderIndex={renderIndex}
            dataIndex={dataIndex}
            render={render}
            shouldCellUpdate={column.shouldCellUpdate}
            expanded={appendCellNode && expanded}
            {...fixedInfo}
            appendNode={appendCellNode}
            additionalProps={additionalCellProps}
          />
        );
      })}
    </RowComponent>
  );

  // ======================== Expand Row =========================
  let expandRowNode: React.ReactElement;
  if (rowSupportExpand && (expandRended || expanded)) {
    const expandContent = expandedRowRender(record, index, indent + 1, expanded);
    const computedExpandedRowClassName =
      expandedRowClassName && expandedRowClassName(record, index, indent);
    expandRowNode = (
      <ExpandedRow
        expanded={expanded}
        className={classNames(
          `${prefixCls}-expanded-row`,
          `${prefixCls}-expanded-row-level-${indent + 1}`,
          computedExpandedRowClassName,
        )}
        prefixCls={prefixCls}
        component={RowComponent}
        cellComponent={cellComponent}
        colSpan={flattenColumns.length}
        isEmpty={false}
      >
        {expandContent}
      </ExpandedRow>
    );
  }

  return (
    <>
      {baseRowNode}
      {expandRowNode}
    </>
  );
}

BodyRow.displayName = 'BodyRow';

export default BodyRow;
