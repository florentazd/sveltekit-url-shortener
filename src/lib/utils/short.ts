export const isShortExist = async (short: string, pb: any) => {
    try {
        await pb.collection("links").getFirstListItem(`short = '${short}'`)
        return true
    } catch {
        return false
    }
}