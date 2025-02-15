'use client'
import { Menu } from 'antd'
import { FC } from 'react'

import { useSiderStore } from '@/modules/store/sidebar.store'
import { usePathname } from 'next/navigation'
import { useScreenSize } from '@/shared/helper/hooks/useScreenSize'

const Sidebar: FC = () => {
    const { siderDetail, isVisible, toggleIsVisible } = useSiderStore(
        (state) => state,
    )
    const { isTablet } = useScreenSize()

    const pathname = usePathname()

    return (
        <div
            className={
                `flex flex-col absolute top-[85px] right-0 left-0 transition-all z-10 ` +
                `md:top-0 md:relative md:justify-between `
            }
            style={
                isTablet
                    ? {
                          opacity: !isVisible ? 1 : 0,
                      }
                    : {
                          display: isVisible ? 'flex' : 'none',
                          opacity: 1,
                          width: '100%',
                      }
            }
        >
            <Menu
                className="flex-grow"
                style={
                    isTablet
                        ? {
                              width: !isVisible ? '200px' : 0,
                          }
                        : {
                              width: '100%',
                          }
                }
                defaultSelectedKeys={['/']}
                selectedKeys={[pathname]}
                defaultOpenKeys={['contact']}
                mode="inline"
                theme="light"
                items={siderDetail}
                onClick={() => {
                    if (!isTablet) toggleIsVisible()
                }}
            />
        </div>
    )
}

export default Sidebar
