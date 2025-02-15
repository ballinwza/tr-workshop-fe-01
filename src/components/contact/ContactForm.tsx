'use client'
import { FC, useEffect, useState } from 'react'
import type { FormProps } from 'antd'
import { Button, Form, Input, message, Modal } from 'antd'
import { IContact } from '@/modules/domain/contact.model'
import { useContactListStore } from '@/modules/store/contactList.store'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'
import { useForm } from 'antd/es/form/Form'
import { useContactFormStore } from '@/modules/store/contactForm.store'

const ContactForm: FC = () => {
    const { formLang } = useContactFormStore((state) => state)
    const { createContact } = useContactListStore((state) => state)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [contactForm] = useForm()
    const router = useRouter()

    useEffect(() => {
        contactForm.validateFields()

        return () => {}
    }, [formLang])

    const onFinish: FormProps<IContact>['onFinish'] = (values) => {
        createContact(values)
        router.push('/contact')
        message.success(formLang.successMessage)
    }

    const onFinishFailed: FormProps<IContact>['onFinishFailed'] = (
        errorInfo,
    ) => {
        message.error(formLang.errorMessage)
        console.log('Failed:', errorInfo)
    }

    return (
        <Form
            form={contactForm}
            name="contact-form"
            className="flex flex-col gap-6"
            labelCol={{
                sm: { span: 24 },
                md: { span: 4 },
                lg: { span: 3 },
                xxl: { span: 2 },
            }}
            wrapperCol={{ sm: { span: 24 }, md: { span: 16 } }}
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
                label={formLang.name}
                name="fullName"
                rules={[{ required: true, message: formLang.nameValidateTxt }]}
            >
                <Input type="text" />
            </Form.Item>

            <Form.Item<IContact>
                label={formLang.age}
                name="age"
                rules={[{ required: true, message: formLang.ageValidateTxt }]}
            >
                <Input type="number" />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    {formLang.submitTxt}
                </Button>
            </Form.Item>

            <Modal
                title={formLang.modalTitle}
                open={isModalOpen}
                okText={formLang.modalOkTxt}
                cancelText={formLang.modalCancelTxt}
                onOk={() => {
                    setIsModalOpen(false)
                    contactForm.submit()
                }}
                onCancel={() => {
                    setIsModalOpen(false)
                    message.error(formLang.errorMessage)
                }}
            >
                {formLang.modalDesc}
            </Modal>
        </Form>
    )
}

export default ContactForm
