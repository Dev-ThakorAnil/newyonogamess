"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./auth";
import { adminLogin, getDashboard, changeAdminPassword, logoutAllDevices } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardData } from "@/lib/types";
import Link from "next/link";

function LoginForm() {
  const { setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await adminLogin(email, password);
      setToken(data.token);
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center font-bold tracking-tight text-slate-900 font-sans">
            🔐 Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)} required id="admin-email"
            />
            <Input
              type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} required id="admin-password"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full bg-green-cta hover:bg-green-cta-hover" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function ChangePassword() {
  const { token, logout } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      await changeAdminPassword(token, oldPassword, newPassword);
      setSuccess("Password updated successfully. Please login again.");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      // Auto logout after 2 seconds
      setTimeout(() => {
        logout();
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">🔒 Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleChangePassword} className="space-y-4 max-w-sm">
          <Input
            type="password" placeholder="Old Password" value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)} required
          />
          <Input
            type="password" placeholder="New Password" value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)} required minLength={6}
          />
          <Input
            type="password" placeholder="Confirm New Password" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-500">{success}</p>}
          <Button type="submit" className="bg-green-cta hover:bg-green-cta-hover" disabled={loading}>
            {loading ? "Updating..." : "Change Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const { token, logout } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = () => {
    if (!token) return;
    setLoading(true);
    setError("");
    getDashboard(token)
      .then(setData)
      .catch((err) => {
        const msg = err.message || "Failed to load dashboard";
        setError(msg);
        // Auto-logout if token is expired/invalid
        if (msg.toLowerCase().includes("invalid") || msg.toLowerCase().includes("expired") || msg.toLowerCase().includes("401")) {
          logout();
        }
      })
      .finally(() => setLoading(false));
  };

  const handleLogoutAll = async () => {
    if (!token) return;
    if (!confirm("Are you sure you want to log out all other devices?")) return;
    
    try {
      await logoutAllDevices(token);
      alert("All other devices have been logged out.");
      fetchDashboard();
    } catch (err: any) {
      alert(err.message || "Failed to logout devices");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-8 w-8 border-2 border-green-cta border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <p className="text-4xl">⚠️</p>
        <p className="text-red-500 text-sm text-center max-w-md">{error || "Failed to load dashboard."}</p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={fetchDashboard}>🔄 Retry</Button>
          <Button variant="outline" onClick={logout} className="text-red-500 border-red-500/30 hover:bg-red-500/10">
            Re-Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
          📊 Dashboard
        </h1>
        <Button variant="outline" onClick={handleLogoutAll} className="text-red-500 border-red-500/30 hover:bg-red-500/10 hover:text-red-600 gap-2">
          <span>🚪</span> Logout All Other Devices
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-green-cta">{data.totalGames}</p>
            <p className="text-sm text-muted-foreground">Total Games</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-gold">{data.totalDownloads}</p>
            <p className="text-sm text-muted-foreground">Downloads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-blue-500">{data.activeSessions}</p>
            <p className="text-sm text-muted-foreground">Active Sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Link href="/admin/games/new" className="text-3xl">➕</Link>
            <p className="text-sm text-muted-foreground mt-1">Add Game</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Games */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🔥 Top Games by Downloads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.topGames.map((game, i) => (
              <div key={game._id} className="flex items-center gap-3">
                <span className="text-lg font-bold text-muted-foreground w-6">#{i + 1}</span>
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm">
                  {game.logo ? <img src={game.logo} className="w-full h-full rounded-lg object-cover" /> : "🎮"}
                </div>
                <span className="flex-1 font-medium text-sm">{game.title}</span>
                <span className="text-sm text-muted-foreground">{game.downloads} downloads</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Games */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🆕 Recent Uploads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {data.recentGames.map((game) => (
              <div key={game._id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{game.title}</span>
                  <span className="text-xs text-muted-foreground capitalize">• {game.category}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(game.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <ChangePassword />
    </div>
  );
}

export default function AdminPage() {
  const { token } = useAuth();
  return token ? <Dashboard /> : <LoginForm />;
}

