'use client'

import { FC, useState } from 'react'
import type { UploadProps } from 'antd'
import { Modal, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

import Image from 'next/image'
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
            title="Upload Profile Image"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
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
                                Click or drag file to this area to upload
                            </p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly
                                prohibited from uploading company data or other
                                banned files.
                            </p>
                        </div>
                    )}
                </div>
            </Dragger>
        </Modal>
    )
}

export default EditProfileImageModal
