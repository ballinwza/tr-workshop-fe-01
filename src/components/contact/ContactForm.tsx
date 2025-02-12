'use client'
import { FC } from 'react'
import type { FormProps } from 'antd'
import { Button, Form, Input } from 'antd'
import { IContact } from '@/modules/domain/contact.model'
import { useContactStore } from '@/modules/store/contact.store'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'

const ContactForm: FC = () => {
    const { createContact } = useContactStore((state) => state)
    const router = useRouter()

    const onFinish: FormProps<IContact>['onFinish'] = (values) => {
        createContact(values)
        router.push('/contact')
    }

    const onFinishFailed: FormProps<IContact>['onFinishFailed'] = (
        errorInfo,
    ) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <Form
            name="contact-form"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<IContact>
                label="Key"
                name="key"
                initialValue={uuidv4()}
                noStyle
            />

            <Form.Item<IContact>
                label="Full Name"
                name="fullName"
                rules={[
                    { required: true, message: 'Please input your full name!' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item<IContact>
                label="Age"
                name="age"
                rules={[{ required: true, message: 'Please input your age!' }]}
            >
                <Input type="number" />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ContactForm
