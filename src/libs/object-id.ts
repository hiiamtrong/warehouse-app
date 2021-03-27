
export const ObjectId = (m = Math, d = Date, h = 16, s = (s: any) => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

export const getObjectId = function (obj: any) {
    if (!obj) return null
    if (obj._id) return obj._id
    if (obj.code === null) return null
    if (obj.code) return obj.code
    return obj
}