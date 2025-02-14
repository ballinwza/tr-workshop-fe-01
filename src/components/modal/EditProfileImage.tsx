'use client'

import { FC, useState } from 'react'
import type { UploadProps } from 'antd'
import { Modal, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

import Image from 'next/image'
import { useLanguageStore } from '@/modules/store/language.store'
const { Dragger } = Upload

interface Props {
    isModalOpen: boolean
    setIsModalOpen: (val: boolean) => void
    imageUrl: string
    setImageUrl: (url: string) => void
}

const EditProfileImageModal: FC<Props> = ({
    isModalOpen,
    setIsModalOpen,
    imageUrl,
    setImageUrl,
}: Props) => {
    const [blobImgUrl, setBlobImgUrl] = useState<string | null>()
    const { currentLang } = useLanguageStore((state) => state)

    const handleOk = () => {
        setIsModalOpen(false)
        setImageUrl(blobImgUrl ?? imageUrl)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const props: UploadProps = {
        name: 'file',
        multiple: false,
        showUploadList: {
            showRemoveIcon: true,
            showPreviewIcon: true,
            showDownloadIcon: true,
        },
        maxCount: 1,
        listType: 'text',
        beforeUpload(file) {
            const blob = new Blob([file], { type: file.type })
            const blobUrl = URL.createObjectURL(blob)
            setBlobImgUrl(blobUrl)
            return false
        },
        onRemove() {
            setBlobImgUrl(null)
        },
    }

    return (
        <Modal
            title={
                currentLang === 'en'
                    ? 'Changing Profile Picture'
                    : 'เปลี่ยนรูปภาพโปรไฟล์'
            }
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={currentLang === 'en' ? 'OK' : 'ตกลง'}
            cancelText={currentLang === 'en' ? 'Cancel' : 'ยกเลิก'}
        >
            <Dragger {...props}>
                <div className="flex justify-center items-center">
                    {blobImgUrl ? (
                        <Image
                            src={blobImgUrl}
                            alt="avatar-iamge"
                            width={200}
                            height={200}
                        />
                    ) : (
                        <div>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                {currentLang === 'en'
                                    ? 'Click or drag file to this area to change picture'
                                    : 'คลิก หรือ ลากรูปภาพใส่บริเวณ เพื่อเปลี่ยนรูปภาพ'}
                            </p>
                            <p className="ant-upload-hint">
                                {currentLang === 'en'
                                    ? 'Support for a single or bulk changing picture.'
                                    : 'รองรับการเปลี่ยนรูปภาพทีละ 1 รูปเท่านั้น'}
                            </p>
                        </div>
                    )}
                </div>
            </Dragger>
        </Modal>
    )
}

export default EditProfileImageModal
