import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminPanel } from "@/components/AdminPanel";
import { useToast } from "@/hooks/use-toast";
import {
  signIn,
  signOut,
  getCurrentSession,
  isSupabaseConfigured,
} from "@/lib/supabase";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Restore session on mount
  useEffect(() => {
    (async () => {
      const session = await getCurrentSession();
      if (session) setIsAuthenticated(true);
    })();
  }, []);

  const handleLogin = async () => {
    if (!isSupabaseConfigured()) {
      toast({
        title: "Error",
        description: "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.",
        variant: "destructive",
      });
      return;
    }
    if (!email || !password) {
      toast({ title: "Error", description: "Email and password required", variant: "destructive" });
      return;
    }
    try {
      setBusy(true);
      await signIn(email, password);
      setIsAuthenticated(true);
      toast({ title: "Success", description: "Logged in" });
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err?.message ?? "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch {
      /* ignore */
    }
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
    navigate("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                type="email"
                autoComplete="username"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                }}
                className="mt-1"
              />
            </div>
            <Button onClick={handleLogin} disabled={busy} className="w-full">
              {busy ? "Signing in…" : "Login"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto">
        <AdminPanel onClose={handleLogout} />
      </div>
    </div>
  );
}
