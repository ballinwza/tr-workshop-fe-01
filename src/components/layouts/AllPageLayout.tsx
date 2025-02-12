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
            <div className="flex flex-grow">
                <Sidebar />
                <div className="flex-grow p-8 bg-violet-300">{children}</div>
            </div>
            <Footerbar />
        </div>
    )
}

export default AllPageLayout
