import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import type { TransitionProps } from '@mui/material/transitions'
import { RichTreeView } from '@mui/x-tree-view/RichTreeView'
import {
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2Label,
  TreeItem2Root,
} from '@mui/x-tree-view/TreeItem2'
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon'
import type { TreeViewBaseItem } from '@mui/x-tree-view/models'
import {
  type UseTreeItem2Parameters,
  unstable_useTreeItem2 as useTreeItem2,
} from '@mui/x-tree-view/useTreeItem2'
import type { UseTreeItem2ReturnValue } from '@mui/x-tree-view/useTreeItem2'
import { animated, useSpring } from '@react-spring/web'
import clsx from 'clsx'
import * as React from 'react'

// カラーの型定義
type Color = 'blue' | 'green'

// ツリーアイテムの拡張プロパティの型定義
type ExtendedTreeItemProps = {
  color?: Color
  id: string
  label: string
}

// ツリーデータの定義
const ITEMS: TreeViewBaseItem<ExtendedTreeItemProps>[] = [
  {
    id: '1',
    label: 'ウェブサイト',
    children: [
      { id: '1.1', label: 'ホーム', color: 'green' },
      { id: '1.2', label: '価格', color: 'green' },
      { id: '1.3', label: '会社概要', color: 'green' },
      {
        id: '1.4',
        label: 'ブログ',
        children: [
          { id: '1.1.1', label: 'お知らせ', color: 'blue' },
          { id: '1.1.2', label: '4月の予定', color: 'blue' },
          { id: '1.1.3', label: '新着情報', color: 'blue' },
          { id: '1.1.4', label: 'チーム紹介', color: 'blue' },
        ],
      },
    ],
  },
  {
    id: '2',
    label: 'ストア',
    children: [
      { id: '2.1', label: '全製品', color: 'green' },
      {
        id: '2.2',
        label: 'カテゴリー',
        children: [
          { id: '2.2.1', label: 'ガジェット', color: 'blue' },
          { id: '2.2.2', label: 'スマートフォン', color: 'blue' },
          { id: '2.2.3', label: 'ウェアラブル', color: 'blue' },
        ],
      },
      { id: '2.3', label: 'ベストセラー', color: 'green' },
      { id: '2.4', label: 'セール', color: 'green' },
    ],
  },
  { id: '4', label: 'お問い合わせ', color: 'blue' },
  { id: '5', label: 'ヘルプ', color: 'blue' },
]

// ドットアイコンコンポーネント
function DotIcon({ color }: { color: string }) {
  return (
    <Box sx={{ marginRight: 1, display: 'flex', alignItems: 'center' }}>
      <svg width={6} height={6}>
        <title>ドットアイコン</title>
        <circle cx={3} cy={3} r={3} fill={color} />
      </svg>
    </Box>
  )
}

// アニメーション付きCollapseコンポーネント
const AnimatedCollapse = animated(Collapse)

// トランジションコンポーネント
function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
    },
  })

  return <AnimatedCollapse style={style} {...props} />
}

// カスタムラベルのプロパティ型定義
interface CustomLabelProps {
  children: React.ReactNode
  color?: Color
  expandable?: boolean
}

// カスタムラベルコンポーネント
function CustomLabel({ color, children, ...other }: CustomLabelProps) {
  const theme = useTheme()
  const colors = {
    blue: (theme.vars || theme).palette.primary.main,
    green: (theme.vars || theme).palette.success.main,
  }

  const iconColor = color ? colors[color] : null
  return (
    <TreeItem2Label {...other} sx={{ display: 'flex', alignItems: 'center' }}>
      {iconColor && <DotIcon color={iconColor} />}
      <Typography
        className="labelText"
        variant="body2"
        sx={{ color: 'text.primary' }}
      >
        {children}
      </Typography>
    </TreeItem2Label>
  )
}

// カスタムツリーアイテムのプロパティ型定義
interface CustomTreeItemProps
  extends Omit<UseTreeItem2Parameters, 'rootRef'>,
    Omit<React.HTMLAttributes<HTMLLIElement>, 'onFocus'> {}

// カスタムツリーアイテムコンポーネント
const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: CustomTreeItemProps,
  ref: React.Ref<HTMLLIElement>,
) {
  const { id, itemId, label, disabled, children, ...other } = props

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
  } = useTreeItem2({
    id,
    itemId,
    children,
    label,
    disabled,
    rootRef: ref,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  }) as UseTreeItem2ReturnValue<any, any>

  return (
    <TreeItem2Root {...getRootProps({ ...other, itemId })}>
      <TreeItem2Content
        {...getContentProps({
          className: clsx('content', {
            expanded: status.expanded,
            selected: status.selected,
            focused: status.focused,
            disabled: status.disabled,
          }),
        })}
      >
        {status.expandable && (
          <TreeItem2IconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </TreeItem2IconContainer>
        )}

        <CustomLabel {...getLabelProps({ color: props.color as Color })} />
      </TreeItem2Content>
      {children && (
        <TransitionComponent
          {...getGroupTransitionProps({ className: 'groupTransition' })}
        />
      )}
    </TreeItem2Root>
  )
})

// メインのツリービューコンポーネント
export default function CustomizedTreeView() {
  return (
    <Card
      variant="outlined"
      sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          製品ツリー
        </Typography>
        <RichTreeView
          items={ITEMS}
          aria-label="ページ"
          multiSelect
          defaultExpandedItems={['1', '1.1']}
          defaultSelectedItems={['1.1', '1.1.1']}
          sx={{
            m: '0 -8px',
            pb: '8px',
            height: 'fit-content',
            flexGrow: 1,
            overflowY: 'auto',
          }}
          slots={{ item: CustomTreeItem }}
        />
      </CardContent>
    </Card>
  )
}
