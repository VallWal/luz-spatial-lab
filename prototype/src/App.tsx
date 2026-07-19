import { matchPath, RouterProvider, useRouter } from './lib/router'
import { StoreProvider } from './store'
import { Launcher } from './Launcher'
import { WalkFlow } from './walk/WalkFlow'
import { PassportDashboard } from './passport/Passport'
import { ActivityDetail, AssetDetail, RoomDetail } from './passport/Details'
import { ActivityScreen, DocumentDetail, DocumentsScreen, FindingDetail } from './passport/Records'
import { EmergencyCard } from './passport/Emergency'
import { OwnerFinding, OwnerHome, OwnerStory, OwnerTimeline } from './Owner'
import { Briefing, InspectorHome } from './inspector/Inspector'
import { VisitFlow } from './inspector/Visit'
import { VisitReview } from './inspector/Review'
import { GuidedDemo } from './Demo'
import { Operations } from './Operations'
import { PresentationRoute } from './Presentation'

function Routes() {
  const { path } = useRouter()

  const room = matchPath('/passport/room/:id', path)
  if (room) return <RoomDetail id={room.id} />

  const asset = matchPath('/passport/asset/:id', path)
  if (asset) return <AssetDetail id={asset.id} />

  const finding = matchPath('/passport/findings/:id', path)
  if (finding) return <FindingDetail id={finding.id} />

  const doc = matchPath('/passport/doc/:id', path)
  if (doc) return <DocumentDetail id={doc.id} />

  const activity = matchPath('/passport/activity/:id', path)
  if (activity) return <ActivityDetail id={activity.id} />

  const ownerFinding = matchPath('/owner/findings/:id', path)
  if (ownerFinding) return <OwnerFinding id={ownerFinding.id} />

  switch (path) {
    case '/walk':
      return <WalkFlow />
    case '/demo':
      return <GuidedDemo />
    case '/inspector':
      return <InspectorHome />
    case '/inspector/briefing':
      return <Briefing />
    case '/inspector/visit':
      return <VisitFlow />
    case '/inspector/review':
      return <VisitReview />
    case '/passport':
      return <PassportDashboard />
    case '/passport/emergency':
      return <EmergencyCard />
    case '/passport/activity':
      return <ActivityScreen />
    case '/passport/documents':
      return <DocumentsScreen />
    case '/owner':
      return <OwnerHome />
    case '/owner/visits/latest':
    case '/owner/story':
      return <OwnerStory />
    case '/owner/timeline':
      return <OwnerTimeline />
    case '/operations':
      return <Operations />
    case '/presentation':
      return <PresentationRoute />
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
