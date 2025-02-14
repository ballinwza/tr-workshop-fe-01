'use client'
import { Button, message, Popconfirm, Table } from 'antd'
import { FC, useEffect } from 'react'
import { ColumnsType } from 'antd/es/table'
import { useContactListStore } from '@/modules/store/contactList.store'
import { IContact } from '@/modules/domain/contact.model'
import { DeleteOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import Highlighter from 'react-highlight-words'
import { useLanguageStore } from '@/modules/store/language.store'

const ContactList: FC = () => {
    const { Search } = Input
    const {
        contactDetail,
        page,
        pageSize,
        setPageSize,
        setPage,
        deleteContactByKey,
        headerColumnsLang,
        searchValue,
        onSearching,
        setSearchValue,
        setContactDetailMax100,
    } = useContactListStore((state) => state)
    const { currentLang } = useLanguageStore((state) => state)

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
            render: (text: string) => (
                <Highlighter
                    highlightStyle={{
                        padding: 0,
                    }}
                    searchWords={[searchValue]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ),
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

    useEffect(() => {
        setContactDetailMax100()
    }, [])

    return (
        <div className="w-full">
            <div className="flex justify-end gap-6 mb-4">
                <Button type="primary" onClick={() => setSearchValue('')}>
                    {currentLang === 'en' ? 'Clear' : 'ล้าง'}
                </Button>
                <Search
                    placeholder={
                        currentLang === 'en'
                            ? 'Input Full Name'
                            : 'ค้นหาด้วย ชื่อ-นามสกุล'
                    }
                    enterButton={currentLang === 'en' ? 'Enter' : 'ค้นหา'}
                    style={{ width: 320 }}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onSearch={onSearching}
                    allowClear
                />
            </div>

            <Table
                rowKey={'key'}
                dataSource={contactDetail}
                columns={columns}
                scroll={{ x: '100%', y: '50vh' }}
                pagination={{
                    defaultCurrent: 1,
                    showSizeChanger: false,
                    pageSize,
                    current: page,
                    onChange(page, pageSize) {
                        setPage(page)
                        setPageSize(pageSize)
                    },
                }}
            />
        </div>
    )
}

export default ContactList
