import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const checkUser = async () => {
            let token = null;
            try {
                token = localStorage.getItem('token');
            } catch (e) {
                console.warn('LocalStorage access blocked');
            }
            if (token) {
                try {
                    const res = await fetch('/api/auth/me', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setUser(data);
                    } else {
                        try { localStorage.removeItem('token'); } catch (e) { }
                    }
                } catch (err) {
                    try { localStorage.removeItem('token'); } catch (e) { }
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);
    const login = async (email, password) => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
            try { localStorage.setItem('token', data.token); } catch (e) { }
            setUser(data.user);
            return { success: true };
        } else {
            return { success: false, message: data.message };
        }
    };
    const register = async (name, email, password, role) => {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role })
        });
        const data = await res.json();
        if (res.ok) {
            try { localStorage.setItem('token', data.token); } catch (e) { }
            setUser(data.user);
            return { success: true };
        } else {
            return { success: false, message: data.message };
        }
    }
    const logout = () => {
        try { localStorage.removeItem('token'); } catch (e) { }
        setUser(null);
    };
    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};