'use client'

import EditProfileImageModal from '@/components/modal/EditProfileImage'
import { useHeaderStore } from '@/modules/store/header.store'
import { useLanguageStore } from '@/modules/store/language.store'
import Image from 'next/image'
import { FC, useState } from 'react'

const HomePage: FC = () => {
    const { currentLang } = useLanguageStore((state) => state)
    const { headerDetail, profileImage, setProfileImage } = useHeaderStore(
        (state) => state,
    )
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h2 className="font-bold text-lg">
                    {currentLang === 'en' ? 'Picture Profile' : 'รูปภาพโปรไฟล์'}
                </h2>
                <div
                    className="w-fit h-fit cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Image
                        src={profileImage}
                        alt="picture-profile"
                        width={200}
                        height={200}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="font-bold text-lg">
                    {currentLang === 'en' ? 'Full Name' : 'ชื่อ-นามสกุล'}
                </h2>
                <p>{headerDetail.fullname}</p>
            </div>

            <EditProfileImageModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                imageUrl={profileImage}
                setImageUrl={setProfileImage}
            />
        </div>
    )
}

export default HomePage
