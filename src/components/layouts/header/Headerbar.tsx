'use client'
import EditProfileImageModal from '@/components/modal/EditProfileImage'
import { useHeaderStore } from '@/modules/store/header.store'
import { useLanguageStore } from '@/modules/store/language.store'

import Image from 'next/image'
import Link from 'next/link'
import { FC, Fragment, useState } from 'react'

const Headerbar: FC = () => {
    const { setCurrentLang } = useLanguageStore((state) => state)
    const { headerDetail, profileImage, setProfileImage } = useHeaderStore(
        (state) => state,
    )
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <Fragment>
            <div className="flex justify-between items-center bg-light-100 text-dark-500">
                <div>
                    <Link href="/">
                        <Image
                            src="/icon/abbon-icon.jpg"
                            alt="logo-image"
                            width={56}
                            height={56}
                        />
                    </Link>
                </div>
                <div className="flex gap-8 items-center">
                    <div onClick={setCurrentLang}>Change Lang</div>
                    <div>{headerDetail?.fullname}</div>
                    <div
                        className="aspect-square h-14 rounded-full overflow-hidden flex items-center justify-center"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Image
                            src={profileImage}
                            alt="avatar-icon"
                            width={56}
                            height={56}
                        />
                    </div>
                </div>
            </div>

            <EditProfileImageModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                imageUrl={profileImage}
                setImageUrl={setProfileImage}
            />
        </Fragment>
    )
}

export default Headerbar
