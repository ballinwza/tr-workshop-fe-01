'use client'
import EditProfileImageModal from '@/components/modal/EditProfileImage'
import { useHeaderStore } from '@/modules/store/header.store'
import { useLanguageStore } from '@/modules/store/language.store'
import { useSiderStore } from '@/modules/store/sidebar.store'
import { LanguageEnum } from '@/shared/enums/language.enum'
import { MenuOutlined } from '@ant-design/icons'

import Image from 'next/image'
import Link from 'next/link'
import { FC, Fragment, useState } from 'react'

const Headerbar: FC = () => {
    const { setCurrentLang } = useLanguageStore((state) => state)
    const { toggleIsVisible } = useSiderStore((state) => state)
    const { headerDetail, profileImage, setProfileImage } = useHeaderStore(
        (state) => state,
    )
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    return (
        <Fragment>
            <div className="flex justify-between items-center bg-light-100 text-dark-500 px-10 py-2.5">
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
                    <div className="flex gap-2">
                        <div
                            className="cursor-pointer"
                            onClick={() => setCurrentLang(LanguageEnum.en)}
                        >
                            EN
                        </div>
                        <div>/</div>
                        <div
                            className="cursor-pointer"
                            onClick={() => setCurrentLang(LanguageEnum.th)}
                        >
                            TH
                        </div>
                    </div>
                    <div>{headerDetail?.fullname}</div>
                    <div
                        className="aspect-square cursor-pointer h-14 rounded-full overflow-hidden flex items-center justify-center"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Image
                            src={profileImage}
                            alt="avatar-icon"
                            width={56}
                            height={56}
                        />
                    </div>
                    <div className="cursor-pointer" onClick={toggleIsVisible}>
                        <MenuOutlined className="text-[28px]" />
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
