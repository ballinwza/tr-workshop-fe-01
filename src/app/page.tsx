'use client'

import EditProfileImageModal from '@/components/modal/EditProfileImage'
import { useHeaderStore } from '@/modules/store/header.store'
import Image from 'next/image'
import { FC, useState } from 'react'

const HomePage: FC = () => {
    const { headerDetail, profileImage, setProfileImage } = useHeaderStore(
        (state) => state,
    )
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    return (
        <div>
            <div>
                <h1>Picture Profile</h1>
                <div
                    className="bg-white w-fit h-fit cursor-pointer"
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

            <div>
                <h2>Full Name</h2>
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
