'use client'
import { Button, message, Popconfirm, Table } from 'antd'
import { FC } from 'react'
import { ColumnsType } from 'antd/es/table'
import { useContactStore } from '@/modules/store/contact.store'
import { IContact } from '@/modules/domain/contact.model'
import { DeleteOutlined } from '@ant-design/icons'

const ContactList: FC = () => {
    const {
        contactDetail,
        page,
        pageSize,
        setPageSize,
        setPage,
        deleteContactByKey,
        headerColumnsLang,
    } = useContactStore((state) => state)

    const columns: ColumnsType<IContact> = [
        {
            title: headerColumnsLang.numeric,
            dataIndex: 'key',
            key: 'key',
            width: '120px',
            render: (_, __, index) => (
                <span>{(page - 1) * pageSize + index + 1}</span>
            ),
        },
        {
            title: headerColumnsLang.fullName,
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: headerColumnsLang.age,
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: headerColumnsLang.action.head,
            key: 'action',
            fixed: 'right',
            render: (_, record) => (
                <Popconfirm
                    title={
                        headerColumnsLang.action.title + ` ${record.fullName}`
                    }
                    description={headerColumnsLang.action.description}
                    onConfirm={() => {
                        message.success(headerColumnsLang.action.confirmMessage)
                        deleteContactByKey(record)
                    }}
                    onCancel={() =>
                        message.error(headerColumnsLang.action.cancelMessage)
                    }
                    okText={headerColumnsLang.action.okTextBtn}
                    cancelText={headerColumnsLang.action.cancelTextBtn}
                >
                    <Button danger>
                        <DeleteOutlined />
                    </Button>
                </Popconfirm>
            ),
        },
    ]

    return (
        <Table
            rowKey={'key'}
            dataSource={contactDetail}
            columns={columns}
            scroll={{ x: '100%', y: '60vh' }}
            pagination={{
                defaultCurrent: 1,
                showSizeChanger: true,
                pageSize,
                onChange(page, pageSize) {
                    setPage(page)
                    setPageSize(pageSize)
                },
            }}
        />
    )
}

export default ContactList
