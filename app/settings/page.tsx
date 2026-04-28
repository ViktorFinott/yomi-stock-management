"use client"

import type React from "react"
import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "@/lib/theme-context"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n/i18n-context"
import { Upload, X, Check, Palette, User, Lock, Moon, Sun, Globe, Plug } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { IntegrationsSection } from "@/components/integrations-section"
import type { Locale } from "@/lib/i18n/translations"

export default function SettingsPage() {
  const {
    currentTheme,
    backgroundImage,
    backgroundOpacity,
    darkMode,
    setTheme,
    setBackgroundImage,
    setBackgroundOpacity,
    setDarkMode,
    themes,
  } = useTheme()
  const { user, changePassword } = useAuth()
  const { t, locale, setLocale, availableLocales, getLocaleName, getLocaleFlag } = useI18n()
  const { toast } = useToast()

  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: t.common.error,
          description: "A imagem deve ter no máximo 5MB",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreviewImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const applyBackground = () => {
    if (previewImage) {
      setBackgroundImage(previewImage)
      toast({
        title: t.common.success,
        description: t.settings.wallpaper + " aplicado",
      })
    }
  }

  const removeBackground = () => {
    setBackgroundImage(null)
    setPreviewImage(null)
    toast({
      title: t.common.success,
      description: t.settings.wallpaper + " removido",
    })
  }

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: t.common.error,
        description: t.auth.passwordMismatch,
        variant: "destructive",
      })
      return
    }

    const result = await changePassword(currentPassword, newPassword)

    if (result.success) {
      toast({
        title: t.common.success,
        description: t.settings.passwordChanged,
      })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } else {
      toast({
        title: t.common.error,
        description: result.error || t.errors.generic,
        variant: "destructive",
      })
    }
  }

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale as Locale)
    toast({
      title: t.common.success,
      description: t.settings.languageChanged,
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.settings.title}</h1>
          <p className="text-muted-foreground mt-2">{t.settings.subtitle}</p>
        </div>

        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-black border-2 border-primary/30">
            <TabsTrigger value="appearance" className="data-[state=active]:bg-primary/20">
              <Palette className="h-4 w-4 mr-2" />
              {t.settings.appearance}
            </TabsTrigger>
            <TabsTrigger value="language" className="data-[state=active]:bg-primary/20">
              <Globe className="h-4 w-4 mr-2" />
              {t.settings.language}
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-primary/20">
              <User className="h-4 w-4 mr-2" />
              {t.settings.account}
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-primary/20">
              <Lock className="h-4 w-4 mr-2" />
              {t.settings.security}
            </TabsTrigger>
            <TabsTrigger value="integrations" className="data-[state=active]:bg-primary/20">
              <Plug className="h-4 w-4 mr-2" />
              {t.settings.integrations}
            </TabsTrigger>
          </TabsList>

          {/* Aba Aparência */}
          <TabsContent value="appearance" className="space-y-6 mt-6">
            {/* Modo Escuro/Claro */}
            <Card className="border-2 border-primary/30 bg-black/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  {darkMode ? t.settings.darkMode : t.settings.lightMode}
                </CardTitle>
                <CardDescription>Alterne entre modo escuro e claro</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t.settings.darkMode}</Label>
                    <p className="text-sm text-muted-foreground">{darkMode ? "Ativado" : "Desativado"}</p>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={(checked) => {
                      setDarkMode(checked)
                      toast({
                        title: t.common.success,
                        description: t.settings.themeChanged,
                      })
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tema de Cores */}
            <Card className="border-2 border-primary/30 bg-black/50">
              <CardHeader>
                <CardTitle>{t.settings.theme}</CardTitle>
                <CardDescription>Escolha a cor principal do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                  {themes.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => {
                        setTheme(theme)
                        toast({
                          title: t.common.success,
                          description: t.settings.themeChanged,
                        })
                      }}
                      className="relative group"
                    >
                      <div
                        className="h-12 w-12 rounded-full border-2 transition-all hover:scale-110 mx-auto"
                        style={{
                          backgroundColor: theme.primary,
                          borderColor: currentTheme.name === theme.name ? "white" : "transparent",
                        }}
                      >
                        {currentTheme.name === theme.name && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Check className="h-5 w-5 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs font-medium mt-2 text-center text-muted-foreground">{theme.name}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Papel de Parede */}
            <Card className="border-2 border-primary/30 bg-black/50">
              <CardHeader>
                <CardTitle>{t.settings.wallpaper}</CardTitle>
                <CardDescription>Personalize o fundo do sistema (máx. 5MB)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  <Button asChild variant="outline" className="border-2 border-primary/30 bg-transparent">
                    <label htmlFor="background-upload" className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      {t.common.upload}
                    </label>
                  </Button>
                  <input
                    id="background-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {(previewImage || backgroundImage) && (
                    <>
                      <Button onClick={applyBackground} disabled={!previewImage} className="border-2 border-primary/30">
                        <Check className="h-4 w-4 mr-2" />
                        {t.common.apply}
                      </Button>
                      <Button onClick={removeBackground} variant="destructive">
                        <X className="h-4 w-4 mr-2" />
                        {t.common.remove}
                      </Button>
                    </>
                  )}
                </div>

                {/* Controle de Transparência */}
                {backgroundImage && (
                  <div className="space-y-2">
                    <Label>
                      {t.settings.transparency}: {backgroundOpacity}%
                    </Label>
                    <Slider
                      value={[backgroundOpacity]}
                      onValueChange={(value) => setBackgroundOpacity(value[0])}
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                )}

                {/* Preview */}
                {(previewImage || backgroundImage) && (
                  <div className="relative h-32 rounded-lg overflow-hidden border-2 border-primary/30">
                    <img
                      src={previewImage || backgroundImage || "/placeholder.svg"}
                      alt="Background preview"
                      className="w-full h-full object-cover blur-sm"
                      style={{ opacity: backgroundOpacity / 100 }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Idioma */}
          <TabsContent value="language" className="space-y-6 mt-6">
            <Card className="border-2 border-primary/30 bg-black/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  {t.settings.selectLanguage}
                </CardTitle>
                <CardDescription>Escolha o idioma do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={locale} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-full bg-black/50 border-2 border-primary/30">
                    <SelectValue placeholder={t.settings.selectLanguage} />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-2 border-primary/30">
                    {availableLocales.map((loc) => (
                      <SelectItem key={loc} value={loc} className="hover:bg-primary/20">
                        <span className="flex items-center gap-2">
                          <span className="text-lg">{getLocaleFlag(loc)}</span>
                          <span>{getLocaleName(loc)}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {availableLocales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => handleLanguageChange(loc)}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                        locale === loc
                          ? "border-primary bg-primary/10"
                          : "border-white/10 hover:border-primary/50 hover:bg-white/5"
                      }`}
                    >
                      <span className="text-2xl">{getLocaleFlag(loc)}</span>
                      <div className="text-left">
                        <p className="font-medium">{getLocaleName(loc)}</p>
                        {locale === loc && <p className="text-xs text-primary">{t.settings.connected}</p>}
                      </div>
                      {locale === loc && <Check className="h-5 w-5 text-primary ml-auto" />}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Conta */}
          <TabsContent value="account" className="space-y-6 mt-6">
            <Card className="border-2 border-primary/30 bg-black/50">
              <CardHeader>
                <CardTitle>{t.settings.accountInfo}</CardTitle>
                <CardDescription>Seus dados pessoais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{t.auth.name}</Label>
                  <Input value={user?.name || ""} disabled className="bg-black/50 border-primary/30" />
                </div>
                <div className="space-y-2">
                  <Label>{t.auth.email}</Label>
                  <Input value={user?.email || ""} disabled className="bg-black/50 border-primary/30" />
                </div>
                <div className="space-y-2">
                  <Label>{t.team.role}</Label>
                  <Input
                    value={
                      user?.role === "admin" ? t.team.admin : user?.role === "manager" ? t.team.manager : t.team.user
                    }
                    disabled
                    className="bg-black/50 border-primary/30"
                  />
                </div>
                {user?.department && (
                  <div className="space-y-2">
                    <Label>{t.auth.department}</Label>
                    <Input value={user.department} disabled className="bg-black/50 border-primary/30" />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Segurança */}
          <TabsContent value="security" className="space-y-6 mt-6">
            <Card className="border-2 border-primary/30 bg-black/50">
              <CardHeader>
                <CardTitle>{t.settings.changePassword}</CardTitle>
                <CardDescription>{t.settings.passwordRequirements}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">{t.settings.currentPassword}</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="bg-black/50 border-2 border-primary/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">{t.settings.newPassword}</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-black/50 border-2 border-primary/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">{t.auth.confirmPassword}</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-black/50 border-2 border-primary/30"
                  />
                </div>
                <Button
                  onClick={handleChangePassword}
                  disabled={!currentPassword || !newPassword || !confirmPassword}
                  className="w-full border-2 border-primary/30"
                >
                  {t.settings.changePassword}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Integrações */}
          <TabsContent value="integrations" className="space-y-6 mt-6">
            <IntegrationsSection />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
