'use client'
import { Menu } from 'antd'
import { FC } from 'react'

import { useSiderStore } from '@/modules/store/sidebar.store'
import { usePathname } from 'next/navigation'

const Sidebar: FC = () => {
    const { siderDetail, isVisible } = useSiderStore((state) => state)
    const pathname = usePathname()

    return (
        <div
            className="flex flex-col justify-between transition-all"
            style={{
                opacity: isVisible ? 1 : 0,
                width: isVisible ? '200px' : 0,
            }}
        >
            <Menu
                className="flex-grow"
                defaultSelectedKeys={['/']}
                selectedKeys={[pathname]}
                defaultOpenKeys={['contact']}
                mode="inline"
                theme="light"
                items={siderDetail}
            />
        </div>
    )
}

export default Sidebar
