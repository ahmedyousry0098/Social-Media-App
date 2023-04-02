
export const pagination = ({page}) => {
    const limit = 30
    const skip = (page - 1) * limit
    if (skip < 1 || typeof skip !== "number") skip = 1
    return {
        limit,
        skip
    }
} 