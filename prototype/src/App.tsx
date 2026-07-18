import { matchPath, RouterProvider, useRouter } from './lib/router'
import { StoreProvider } from './store'
import { Launcher } from './Launcher'
import { WalkFlow } from './walk/WalkFlow'
import { PassportDashboard } from './passport/Passport'
import { ActivityDetail, AssetDetail, RoomDetail } from './passport/Details'
import { EmergencyCard } from './passport/Emergency'
import { OwnerHome, OwnerStory, OwnerTimeline } from './Owner'

function Routes() {
  const { path } = useRouter()

  const room = matchPath('/passport/room/:id', path)
  if (room) return <RoomDetail id={room.id} />

  const asset = matchPath('/passport/asset/:id', path)
  if (asset) return <AssetDetail id={asset.id} />

  const activity = matchPath('/passport/activity/:id', path)
  if (activity) return <ActivityDetail id={activity.id} />

  switch (path) {
    case '/walk':
      return <WalkFlow />
    case '/passport':
      return <PassportDashboard />
    case '/passport/emergency':
      return <EmergencyCard />
    case '/owner':
      return <OwnerHome />
    case '/owner/story':
      return <OwnerStory />
    case '/owner/timeline':
      return <OwnerTimeline />
    default:
      return <Launcher />
  }
}

export default function App() {
  return (
    <StoreProvider>
      <RouterProvider>
        <Routes />
      </RouterProvider>
    </StoreProvider>
  )
}
