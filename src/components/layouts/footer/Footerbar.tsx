'use client'
import { useFooterStore } from '@/modules/store/footer.store'
import { MailOutlined, PhoneOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { FC } from 'react'

const Footerbar: FC = () => {
    const { footerDetail } = useFooterStore((state) => state)
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-6 bg-light-100 text-dark-500">
            <div className="max-w-[400px] text-center text-sm">
                {footerDetail.address}
            </div>
            <div className="flex gap-4 text-sm">
                <div>
                    <a href="tel:+6620556635">
                        <PhoneOutlined /> {footerDetail.phoneNumber}
                    </a>
                </div>
                <div>
                    <a href={`mailto:${footerDetail.email}`}>
                        <MailOutlined /> {footerDetail.email}
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
