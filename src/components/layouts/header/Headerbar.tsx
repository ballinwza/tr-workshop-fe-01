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
    const tabletScreen = window.innerWidth >= 768

    const { toggleIsVisible, isVisible } = useSiderStore((state) => state)
    const { headerDetail, profileImage, setProfileImage } = useHeaderStore(
        (state) => state,
    )
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const checkScreenSize = () => {
        if (tabletScreen) {
            return (
                <Fragment>
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
                </Fragment>
            )
        } else {
            return (
                <div
                    className="absolute top-[76px] left-0 right-0 z-20 bg-light-100"
                    style={{
                        display: isVisible ? 'block' : 'none',
                    }}
                >
                    <div className="flex justify-between items-center p-4">
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

                        <div>{headerDetail?.fullname}</div>

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
                    </div>
                </div>
            )
        }
    }

    return (
        <Fragment>
            <div className="flex justify-between items-center bg-light-100 text-dark-500 px-10 py-2.5 relative z-10">
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
                    {checkScreenSize()}
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
