import service from '@/plugins/axios/index.js'

// TODO: 接口看看有没有更好的处理方式

export const getPhoneVertifyApi = async (params) => {
    const res = await service.post('http://47.94.9.24:80/system/phone/send',
        params
    )
    return res
}

export const UserLoginApi = async (params) => {
    const res = await service.post('http://47.94.9.24:80/user/auth/login/normal',
        {
            ...params
        },
        {
            headers: {
                'X-CAPTCHA-TICKET': params.ticket
            },
        }
    )
    return res
}

export const UserVertifyLoginApi = async (params) => {
    const res = await service.post('http://47.94.9.24:80/user/auth/login/phone',
        {
            ...params
        },
        {
            headers: {
                'X-CAPTCHA-TICKET': params.ticket
            }
        }
    )
    return res
}

export const UserRegisterApi = async (params) => {
    console.log(params, 'params----');
    const res = await service.post('http://47.94.9.24:80/user/auth/register',
        {
            ...params
        },
        {
            headers: {
                'X-CAPTCHA-TICKET': params.ticket
            },
        }
    )
    return res
}

export const ResetPwdApi = async (params) => {
    const res = await service.post('http://47.94.9.24:80/user/auth/reset/password',
        {
            ...params
        },
        {
            headers: {
                'X-CAPTCHA-TICKET': params.ticket
            },
        }
    )
    return res
}

export const ResetUserNameApi = async (params) => {
    const res = await service.post('http://47.94.9.24:80/user/auth/reset/name',
        {
            ...params
        },
        {
            headers: {
                'X-CAPTCHA-TICKET': params.ticket,
                'X-USER-AUTH': localStorage.getItem('SUMMON_WAR_SESSION')
            },
        }
    )
    return res
}

export const getUserDataApi = async (params) => {
    const res = await service.get('http://47.94.9.24:80/user/auth/reset/name', {
        headers: {
            'X-USER-AUTH': localStorage.getItem('SUMMON_WAR_SESSION')
        }
    }
    )
    return res
}

export const resetUserAvatarApi = async (params) => {
    const res = await service.post('http://47.94.9.24:80/user/info/update/avatar',
        {
            ...params
        },
        {
            headers: {
                'X-CAPTCHA-TICKET': params.ticket,
                'X-USER-AUTH': localStorage.getItem('SUMMON_WAR_SESSION')
            },
        }
    )
    return res
}