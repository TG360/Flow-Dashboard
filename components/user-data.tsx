import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "@/lib/props"

export function UserData({users}: {users: User[]}) {
  return (
    <div className="space-y-8">
      {users.map((user) => (
        <div key={user.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{user.firstName}</p>
            <p className="text-sm text-muted-foreground">{user.emailAddress}</p>
          </div>
          <div className="ml-auto font-medium">{user.role ? user.role : "Undefined"}</div>
        </div>
      ))}
    </div>
  )
}



