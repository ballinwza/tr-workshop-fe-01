'use client'
import { useFooterStore } from '@/modules/store/footer.store'
import { changeToPhoneNumber } from '@/shared/helper/changeToPhoneNumber'
import Image from 'next/image'
import { FC } from 'react'

const Footerbar: FC = () => {
    const { footerDetail } = useFooterStore((state) => state)

    return (
        <div className="flex flex-col items-center justify-center gap-4 py-6 bg-light-100 text-dark-500 px-6 md:px-0">
            <div className="max-w-[400px] text-center text-sm">
                {footerDetail.address}
            </div>
            <div className="flex gap-4 text-sm">
                <div>
                    <a
                        href={`tel:+66${changeToPhoneNumber(footerDetail.phoneNumber)}`}
                    >
                        <Image
                            src="/icon/phone-icon.svg"
                            alt="line-icon"
                            width={30}
                            height={30}
                        />
                    </a>
                </div>
                <div>
                    <a href={`mailto:${footerDetail.email}`}>
                        <Image
                            src="/icon/email-icon.svg"
                            alt="line-icon"
                            width={30}
                            height={30}
                        />
                    </a>
                </div>
                <div>
                    <a href={`${footerDetail.lineAddress}`} target="_blank">
                        <Image
                            src="/icon/line-icon.svg"
                            alt="line-icon"
                            width={30}
                            height={30}
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footerbar
