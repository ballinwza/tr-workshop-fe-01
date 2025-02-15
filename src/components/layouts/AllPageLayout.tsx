import { FC, ReactNode } from 'react'

import Sidebar from './sider/Sidebar'

import Footerbar from './footer/Footerbar'
import Headerbar from './header/Headerbar'

interface Props {
    children: ReactNode
}
const AllPageLayout: FC<Props> = ({ children }: Props) => {
    return (
        <div className="flex flex-col min-h-screen justify-between">
            <Headerbar />
            <div className="flex flex-grow relative">
                <Sidebar />
                <div
                    className={
                        `flex-grow px-4 py-8 w-full max-w-[100vw] flex justify-end ` +
                        `md:p-8 `
                    }
                    style={{
                        backgroundColor: '#e8dac6',
                    }}
                >
                    {children}
                </div>
            </div>
            <Footerbar />
        </div>
    )
}

export default AllPageLayout
