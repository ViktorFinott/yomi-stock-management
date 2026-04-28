export type Locale = "pt-BR" | "en-US" | "es-ES" | "fr-FR" | "de-DE"

export interface Translations {
  common: {
    back: string
    save: string
    cancel: string
    delete: string
    edit: string
    add: string
    search: string
    filter: string
    export: string
    loading: string
    noResults: string
    success: string
    error: string
    confirm: string
    close: string
    yes: string
    no: string
    all: string
    none: string
    select: string
    upload: string
    download: string
    copy: string
    share: string
    settings: string
    logout: string
    profile: string
    notifications: string
    help: string
    view: string
    create: string
    update: string
    remove: string
    refresh: string
    apply: string
    reset: string
  }
  auth: {
    login: string
    register: string
    email: string
    password: string
    confirmPassword: string
    forgotPassword: string
    rememberMe: string
    loginTitle: string
    loginSubtitle: string
    registerTitle: string
    registerSubtitle: string
    name: string
    phone: string
    department: string
    loginButton: string
    registerButton: string
    noAccount: string
    hasAccount: string
    invalidCredentials: string
    passwordMismatch: string
    weakPassword: string
    emailExists: string
    logoutSuccess: string
    loginSuccess: string
    registerSuccess: string
  }
  navigation: {
    dashboard: string
    inventory: string
    analytics: string
    requests: string
    communication: string
    calendar: string
    friends: string
    notes: string
    finance: string
    code: string
    integrations: string
    team: string
    settings: string
    stockManagement: string
  }
  dashboard: {
    title: string
    welcome: string
    overview: string
    quickActions: string
    recentActivity: string
    totalItems: string
    lowStock: string
    pendingRequests: string
    teamMembers: string
    totalValue: string
    monthlyGrowth: string
  }
  inventory: {
    title: string
    subtitle: string
    addItem: string
    editItem: string
    deleteItem: string
    itemName: string
    category: string
    quantity: string
    price: string
    status: string
    location: string
    supplier: string
    description: string
    serialNumber: string
    purchaseDate: string
    warranty: string
    inStock: string
    lowStock: string
    outOfStock: string
    totalItems: string
    totalValue: string
    categories: {
      hardware: string
      software: string
      network: string
      peripherals: string
      accessories: string
      other: string
    }
  }
  settings: {
    title: string
    subtitle: string
    appearance: string
    account: string
    security: string
    integrations: string
    language: string
    theme: string
    darkMode: string
    lightMode: string
    wallpaper: string
    transparency: string
    changePassword: string
    currentPassword: string
    newPassword: string
    passwordRequirements: string
    selectLanguage: string
    languageChanged: string
    themeChanged: string
    passwordChanged: string
    accountInfo: string
    connectedApps: string
    connect: string
    disconnect: string
    connected: string
    notConnected: string
  }
  calendar: {
    title: string
    subtitle: string
    addEvent: string
    editEvent: string
    deleteEvent: string
    eventTitle: string
    eventDescription: string
    startDate: string
    endDate: string
    startTime: string
    endTime: string
    allDay: string
    recurring: string
    reminder: string
    personal: string
    team: string
    priority: {
      low: string
      medium: string
      high: string
    }
    today: string
    week: string
    month: string
  }
  finance: {
    title: string
    subtitle: string
    income: string
    expenses: string
    balance: string
    budget: string
    category: string
    amount: string
    date: string
    description: string
    addTransaction: string
    editTransaction: string
    monthlySummary: string
    yearlyOverview: string
    savingsGoal: string
    spendingLimit: string
  }
  team: {
    title: string
    subtitle: string
    addMember: string
    editMember: string
    removeMember: string
    memberName: string
    role: string
    permissions: string
    status: string
    active: string
    inactive: string
    pending: string
    admin: string
    manager: string
    user: string
    inviteMember: string
    totalMembers: string
    onlineNow: string
  }
  notes: {
    title: string
    subtitle: string
    addNote: string
    editNote: string
    deleteNote: string
    noteTitle: string
    noteContent: string
    quickNotes: string
    pinned: string
    archived: string
    tags: string
    lastModified: string
  }
  communication: {
    title: string
    subtitle: string
    channels: string
    directMessages: string
    newChannel: string
    newMessage: string
    members: string
    online: string
    offline: string
    typing: string
    sendMessage: string
    attachFile: string
  }
  requests: {
    title: string
    subtitle: string
    newRequest: string
    pending: string
    approved: string
    rejected: string
    inProgress: string
    completed: string
    requestType: string
    priority: string
    assignedTo: string
    dueDate: string
    comments: string
  }
  analytics: {
    title: string
    subtitle: string
    overview: string
    reports: string
    trends: string
    performance: string
    weekly: string
    monthly: string
    yearly: string
    export: string
    generateReport: string
  }
  errors: {
    generic: string
    network: string
    unauthorized: string
    notFound: string
    serverError: string
    validation: string
    timeout: string
    tooManyRequests: string
  }
}

export const translations: Record<Locale, Translations> = {
  "pt-BR": {
    common: {
      back: "Voltar",
      save: "Salvar",
      cancel: "Cancelar",
      delete: "Excluir",
      edit: "Editar",
      add: "Adicionar",
      search: "Buscar",
      filter: "Filtrar",
      export: "Exportar",
      loading: "Carregando...",
      noResults: "Nenhum resultado encontrado",
      success: "Sucesso",
      error: "Erro",
      confirm: "Confirmar",
      close: "Fechar",
      yes: "Sim",
      no: "Não",
      all: "Todos",
      none: "Nenhum",
      select: "Selecionar",
      upload: "Enviar",
      download: "Baixar",
      copy: "Copiar",
      share: "Compartilhar",
      settings: "Configurações",
      logout: "Sair",
      profile: "Perfil",
      notifications: "Notificações",
      help: "Ajuda",
      view: "Visualizar",
      create: "Criar",
      update: "Atualizar",
      remove: "Remover",
      refresh: "Atualizar",
      apply: "Aplicar",
      reset: "Resetar",
    },
    auth: {
      login: "Entrar",
      register: "Cadastrar",
      email: "Email",
      password: "Senha",
      confirmPassword: "Confirmar Senha",
      forgotPassword: "Esqueceu a senha?",
      rememberMe: "Lembrar de mim",
      loginTitle: "Bem-vindo de volta",
      loginSubtitle: "Entre com suas credenciais para acessar o sistema",
      registerTitle: "Criar Conta de Administrador",
      registerSubtitle: "Preencha seus dados para criar uma nova conta",
      name: "Nome Completo",
      phone: "Telefone",
      department: "Departamento",
      loginButton: "Acessar Sistema",
      registerButton: "Criar Conta",
      noAccount: "Não tem conta?",
      hasAccount: "Já tem conta?",
      invalidCredentials: "Email ou senha inválidos",
      passwordMismatch: "As senhas não coincidem",
      weakPassword: "Senha muito fraca",
      emailExists: "Este email já está cadastrado",
      logoutSuccess: "Logout realizado com sucesso",
      loginSuccess: "Login realizado com sucesso",
      registerSuccess: "Conta criada com sucesso",
    },
    navigation: {
      dashboard: "Painel",
      inventory: "Inventário",
      analytics: "Análises",
      requests: "Solicitações",
      communication: "Comunicação",
      calendar: "Agenda",
      friends: "Amigos & Grupos",
      notes: "Anotações",
      finance: "Financeiro",
      code: "Code",
      integrations: "Integrações",
      team: "Equipe",
      settings: "Configurações",
      stockManagement: "Gestão de Estoque",
    },
    dashboard: {
      title: "Painel de Controle",
      welcome: "Bem-vindo",
      overview: "Visão Geral",
      quickActions: "Ações Rápidas",
      recentActivity: "Atividade Recente",
      totalItems: "Total de Itens",
      lowStock: "Estoque Baixo",
      pendingRequests: "Solicitações Pendentes",
      teamMembers: "Membros da Equipe",
      totalValue: "Valor Total",
      monthlyGrowth: "Crescimento Mensal",
    },
    inventory: {
      title: "Inventário",
      subtitle: "Gerencie todos os itens do estoque",
      addItem: "Adicionar Item",
      editItem: "Editar Item",
      deleteItem: "Excluir Item",
      itemName: "Nome do Item",
      category: "Categoria",
      quantity: "Quantidade",
      price: "Preço",
      status: "Status",
      location: "Localização",
      supplier: "Fornecedor",
      description: "Descrição",
      serialNumber: "Número de Série",
      purchaseDate: "Data de Compra",
      warranty: "Garantia",
      inStock: "Em Estoque",
      lowStock: "Estoque Baixo",
      outOfStock: "Sem Estoque",
      totalItems: "Total de Itens",
      totalValue: "Valor Total",
      categories: {
        hardware: "Hardware",
        software: "Software",
        network: "Rede",
        peripherals: "Periféricos",
        accessories: "Acessórios",
        other: "Outros",
      },
    },
    settings: {
      title: "Configurações",
      subtitle: "Gerencie suas preferências e conta",
      appearance: "Aparência",
      account: "Conta",
      security: "Segurança",
      integrations: "Integrações",
      language: "Idioma",
      theme: "Tema",
      darkMode: "Modo Escuro",
      lightMode: "Modo Claro",
      wallpaper: "Papel de Parede",
      transparency: "Transparência",
      changePassword: "Alterar Senha",
      currentPassword: "Senha Atual",
      newPassword: "Nova Senha",
      passwordRequirements: "Mínimo 8 caracteres com maiúsculas, minúsculas, números e símbolos",
      selectLanguage: "Selecionar Idioma",
      languageChanged: "Idioma alterado com sucesso",
      themeChanged: "Tema alterado com sucesso",
      passwordChanged: "Senha alterada com sucesso",
      accountInfo: "Informações da Conta",
      connectedApps: "Aplicativos Conectados",
      connect: "Conectar",
      disconnect: "Desconectar",
      connected: "Conectado",
      notConnected: "Não Conectado",
    },
    calendar: {
      title: "Agenda",
      subtitle: "Gerencie seus compromissos e eventos",
      addEvent: "Adicionar Evento",
      editEvent: "Editar Evento",
      deleteEvent: "Excluir Evento",
      eventTitle: "Título do Evento",
      eventDescription: "Descrição",
      startDate: "Data de Início",
      endDate: "Data de Término",
      startTime: "Hora de Início",
      endTime: "Hora de Término",
      allDay: "Dia Inteiro",
      recurring: "Recorrente",
      reminder: "Lembrete",
      personal: "Pessoal",
      team: "Equipe",
      priority: {
        low: "Baixa",
        medium: "Média",
        high: "Alta",
      },
      today: "Hoje",
      week: "Semana",
      month: "Mês",
    },
    finance: {
      title: "Financeiro",
      subtitle: "Controle suas finanças pessoais",
      income: "Receitas",
      expenses: "Despesas",
      balance: "Saldo",
      budget: "Orçamento",
      category: "Categoria",
      amount: "Valor",
      date: "Data",
      description: "Descrição",
      addTransaction: "Adicionar Transação",
      editTransaction: "Editar Transação",
      monthlySummary: "Resumo Mensal",
      yearlyOverview: "Visão Anual",
      savingsGoal: "Meta de Economia",
      spendingLimit: "Limite de Gastos",
    },
    team: {
      title: "Equipe",
      subtitle: "Gerencie sua equipe e permissões",
      addMember: "Adicionar Membro",
      editMember: "Editar Membro",
      removeMember: "Remover Membro",
      memberName: "Nome do Membro",
      role: "Função",
      permissions: "Permissões",
      status: "Status",
      active: "Ativo",
      inactive: "Inativo",
      pending: "Pendente",
      admin: "Administrador",
      manager: "Gerente",
      user: "Usuário",
      inviteMember: "Convidar Membro",
      totalMembers: "Total de Membros",
      onlineNow: "Online Agora",
    },
    notes: {
      title: "Anotações",
      subtitle: "Suas notas e lembretes",
      addNote: "Adicionar Nota",
      editNote: "Editar Nota",
      deleteNote: "Excluir Nota",
      noteTitle: "Título",
      noteContent: "Conteúdo",
      quickNotes: "Bloco de Notas Rápido",
      pinned: "Fixadas",
      archived: "Arquivadas",
      tags: "Tags",
      lastModified: "Última Modificação",
    },
    communication: {
      title: "Comunicação",
      subtitle: "Chat e mensagens da equipe",
      channels: "Canais",
      directMessages: "Mensagens Diretas",
      newChannel: "Novo Canal",
      newMessage: "Nova Mensagem",
      members: "Membros",
      online: "Online",
      offline: "Offline",
      typing: "digitando...",
      sendMessage: "Enviar Mensagem",
      attachFile: "Anexar Arquivo",
    },
    requests: {
      title: "Solicitações",
      subtitle: "Gerencie solicitações e pedidos",
      newRequest: "Nova Solicitação",
      pending: "Pendentes",
      approved: "Aprovadas",
      rejected: "Rejeitadas",
      inProgress: "Em Andamento",
      completed: "Concluídas",
      requestType: "Tipo",
      priority: "Prioridade",
      assignedTo: "Atribuído a",
      dueDate: "Data Limite",
      comments: "Comentários",
    },
    analytics: {
      title: "Análises",
      subtitle: "Relatórios e estatísticas",
      overview: "Visão Geral",
      reports: "Relatórios",
      trends: "Tendências",
      performance: "Desempenho",
      weekly: "Semanal",
      monthly: "Mensal",
      yearly: "Anual",
      export: "Exportar",
      generateReport: "Gerar Relatório",
    },
    errors: {
      generic: "Ocorreu um erro inesperado",
      network: "Erro de conexão. Verifique sua internet",
      unauthorized: "Acesso não autorizado",
      notFound: "Recurso não encontrado",
      serverError: "Erro no servidor",
      validation: "Erro de validação",
      timeout: "Tempo limite excedido",
      tooManyRequests: "Muitas tentativas. Aguarde um momento",
    },
  },
  "en-US": {
    common: {
      back: "Back",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      add: "Add",
      search: "Search",
      filter: "Filter",
      export: "Export",
      loading: "Loading...",
      noResults: "No results found",
      success: "Success",
      error: "Error",
      confirm: "Confirm",
      close: "Close",
      yes: "Yes",
      no: "No",
      all: "All",
      none: "None",
      select: "Select",
      upload: "Upload",
      download: "Download",
      copy: "Copy",
      share: "Share",
      settings: "Settings",
      logout: "Logout",
      profile: "Profile",
      notifications: "Notifications",
      help: "Help",
      view: "View",
      create: "Create",
      update: "Update",
      remove: "Remove",
      refresh: "Refresh",
      apply: "Apply",
      reset: "Reset",
    },
    auth: {
      login: "Login",
      register: "Register",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      forgotPassword: "Forgot password?",
      rememberMe: "Remember me",
      loginTitle: "Welcome back",
      loginSubtitle: "Enter your credentials to access the system",
      registerTitle: "Create Admin Account",
      registerSubtitle: "Fill in your details to create a new account",
      name: "Full Name",
      phone: "Phone",
      department: "Department",
      loginButton: "Access System",
      registerButton: "Create Account",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      invalidCredentials: "Invalid email or password",
      passwordMismatch: "Passwords don't match",
      weakPassword: "Password too weak",
      emailExists: "This email is already registered",
      logoutSuccess: "Logged out successfully",
      loginSuccess: "Logged in successfully",
      registerSuccess: "Account created successfully",
    },
    navigation: {
      dashboard: "Dashboard",
      inventory: "Inventory",
      analytics: "Analytics",
      requests: "Requests",
      communication: "Communication",
      calendar: "Calendar",
      friends: "Friends & Groups",
      notes: "Notes",
      finance: "Finance",
      code: "Code",
      integrations: "Integrations",
      team: "Team",
      settings: "Settings",
      stockManagement: "Stock Management",
    },
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome",
      overview: "Overview",
      quickActions: "Quick Actions",
      recentActivity: "Recent Activity",
      totalItems: "Total Items",
      lowStock: "Low Stock",
      pendingRequests: "Pending Requests",
      teamMembers: "Team Members",
      totalValue: "Total Value",
      monthlyGrowth: "Monthly Growth",
    },
    inventory: {
      title: "Inventory",
      subtitle: "Manage all stock items",
      addItem: "Add Item",
      editItem: "Edit Item",
      deleteItem: "Delete Item",
      itemName: "Item Name",
      category: "Category",
      quantity: "Quantity",
      price: "Price",
      status: "Status",
      location: "Location",
      supplier: "Supplier",
      description: "Description",
      serialNumber: "Serial Number",
      purchaseDate: "Purchase Date",
      warranty: "Warranty",
      inStock: "In Stock",
      lowStock: "Low Stock",
      outOfStock: "Out of Stock",
      totalItems: "Total Items",
      totalValue: "Total Value",
      categories: {
        hardware: "Hardware",
        software: "Software",
        network: "Network",
        peripherals: "Peripherals",
        accessories: "Accessories",
        other: "Other",
      },
    },
    settings: {
      title: "Settings",
      subtitle: "Manage your preferences and account",
      appearance: "Appearance",
      account: "Account",
      security: "Security",
      integrations: "Integrations",
      language: "Language",
      theme: "Theme",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
      wallpaper: "Wallpaper",
      transparency: "Transparency",
      changePassword: "Change Password",
      currentPassword: "Current Password",
      newPassword: "New Password",
      passwordRequirements: "Minimum 8 characters with uppercase, lowercase, numbers and symbols",
      selectLanguage: "Select Language",
      languageChanged: "Language changed successfully",
      themeChanged: "Theme changed successfully",
      passwordChanged: "Password changed successfully",
      accountInfo: "Account Information",
      connectedApps: "Connected Apps",
      connect: "Connect",
      disconnect: "Disconnect",
      connected: "Connected",
      notConnected: "Not Connected",
    },
    calendar: {
      title: "Calendar",
      subtitle: "Manage your appointments and events",
      addEvent: "Add Event",
      editEvent: "Edit Event",
      deleteEvent: "Delete Event",
      eventTitle: "Event Title",
      eventDescription: "Description",
      startDate: "Start Date",
      endDate: "End Date",
      startTime: "Start Time",
      endTime: "End Time",
      allDay: "All Day",
      recurring: "Recurring",
      reminder: "Reminder",
      personal: "Personal",
      team: "Team",
      priority: {
        low: "Low",
        medium: "Medium",
        high: "High",
      },
      today: "Today",
      week: "Week",
      month: "Month",
    },
    finance: {
      title: "Finance",
      subtitle: "Control your personal finances",
      income: "Income",
      expenses: "Expenses",
      balance: "Balance",
      budget: "Budget",
      category: "Category",
      amount: "Amount",
      date: "Date",
      description: "Description",
      addTransaction: "Add Transaction",
      editTransaction: "Edit Transaction",
      monthlySummary: "Monthly Summary",
      yearlyOverview: "Yearly Overview",
      savingsGoal: "Savings Goal",
      spendingLimit: "Spending Limit",
    },
    team: {
      title: "Team",
      subtitle: "Manage your team and permissions",
      addMember: "Add Member",
      editMember: "Edit Member",
      removeMember: "Remove Member",
      memberName: "Member Name",
      role: "Role",
      permissions: "Permissions",
      status: "Status",
      active: "Active",
      inactive: "Inactive",
      pending: "Pending",
      admin: "Administrator",
      manager: "Manager",
      user: "User",
      inviteMember: "Invite Member",
      totalMembers: "Total Members",
      onlineNow: "Online Now",
    },
    notes: {
      title: "Notes",
      subtitle: "Your notes and reminders",
      addNote: "Add Note",
      editNote: "Edit Note",
      deleteNote: "Delete Note",
      noteTitle: "Title",
      noteContent: "Content",
      quickNotes: "Quick Notepad",
      pinned: "Pinned",
      archived: "Archived",
      tags: "Tags",
      lastModified: "Last Modified",
    },
    communication: {
      title: "Communication",
      subtitle: "Team chat and messages",
      channels: "Channels",
      directMessages: "Direct Messages",
      newChannel: "New Channel",
      newMessage: "New Message",
      members: "Members",
      online: "Online",
      offline: "Offline",
      typing: "typing...",
      sendMessage: "Send Message",
      attachFile: "Attach File",
    },
    requests: {
      title: "Requests",
      subtitle: "Manage requests and orders",
      newRequest: "New Request",
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
      inProgress: "In Progress",
      completed: "Completed",
      requestType: "Type",
      priority: "Priority",
      assignedTo: "Assigned To",
      dueDate: "Due Date",
      comments: "Comments",
    },
    analytics: {
      title: "Analytics",
      subtitle: "Reports and statistics",
      overview: "Overview",
      reports: "Reports",
      trends: "Trends",
      performance: "Performance",
      weekly: "Weekly",
      monthly: "Monthly",
      yearly: "Yearly",
      export: "Export",
      generateReport: "Generate Report",
    },
    errors: {
      generic: "An unexpected error occurred",
      network: "Connection error. Check your internet",
      unauthorized: "Unauthorized access",
      notFound: "Resource not found",
      serverError: "Server error",
      validation: "Validation error",
      timeout: "Request timeout",
      tooManyRequests: "Too many attempts. Please wait",
    },
  },
  "es-ES": {
    common: {
      back: "Volver",
      save: "Guardar",
      cancel: "Cancelar",
      delete: "Eliminar",
      edit: "Editar",
      add: "Añadir",
      search: "Buscar",
      filter: "Filtrar",
      export: "Exportar",
      loading: "Cargando...",
      noResults: "Sin resultados",
      success: "Éxito",
      error: "Error",
      confirm: "Confirmar",
      close: "Cerrar",
      yes: "Sí",
      no: "No",
      all: "Todos",
      none: "Ninguno",
      select: "Seleccionar",
      upload: "Subir",
      download: "Descargar",
      copy: "Copiar",
      share: "Compartir",
      settings: "Ajustes",
      logout: "Cerrar sesión",
      profile: "Perfil",
      notifications: "Notificaciones",
      help: "Ayuda",
      view: "Ver",
      create: "Crear",
      update: "Actualizar",
      remove: "Eliminar",
      refresh: "Actualizar",
      apply: "Aplicar",
      reset: "Restablecer",
    },
    auth: {
      login: "Iniciar sesión",
      register: "Registrarse",
      email: "Correo electrónico",
      password: "Contraseña",
      confirmPassword: "Confirmar contraseña",
      forgotPassword: "¿Olvidó su contraseña?",
      rememberMe: "Recordarme",
      loginTitle: "Bienvenido de nuevo",
      loginSubtitle: "Ingrese sus credenciales para acceder",
      registerTitle: "Crear cuenta de administrador",
      registerSubtitle: "Complete sus datos para crear una cuenta",
      name: "Nombre completo",
      phone: "Teléfono",
      department: "Departamento",
      loginButton: "Acceder al sistema",
      registerButton: "Crear cuenta",
      noAccount: "¿No tiene cuenta?",
      hasAccount: "¿Ya tiene cuenta?",
      invalidCredentials: "Correo o contraseña inválidos",
      passwordMismatch: "Las contraseñas no coinciden",
      weakPassword: "Contraseña muy débil",
      emailExists: "Este correo ya está registrado",
      logoutSuccess: "Sesión cerrada exitosamente",
      loginSuccess: "Sesión iniciada exitosamente",
      registerSuccess: "Cuenta creada exitosamente",
    },
    navigation: {
      dashboard: "Panel",
      inventory: "Inventario",
      analytics: "Análisis",
      requests: "Solicitudes",
      communication: "Comunicación",
      calendar: "Calendario",
      friends: "Amigos y Grupos",
      notes: "Notas",
      finance: "Finanzas",
      code: "Código",
      integrations: "Integraciones",
      team: "Equipo",
      settings: "Ajustes",
      stockManagement: "Gestión de Stock",
    },
    dashboard: {
      title: "Panel de Control",
      welcome: "Bienvenido",
      overview: "Resumen",
      quickActions: "Acciones Rápidas",
      recentActivity: "Actividad Reciente",
      totalItems: "Total de Artículos",
      lowStock: "Stock Bajo",
      pendingRequests: "Solicitudes Pendientes",
      teamMembers: "Miembros del Equipo",
      totalValue: "Valor Total",
      monthlyGrowth: "Crecimiento Mensual",
    },
    inventory: {
      title: "Inventario",
      subtitle: "Gestione todos los artículos",
      addItem: "Añadir Artículo",
      editItem: "Editar Artículo",
      deleteItem: "Eliminar Artículo",
      itemName: "Nombre del Artículo",
      category: "Categoría",
      quantity: "Cantidad",
      price: "Precio",
      status: "Estado",
      location: "Ubicación",
      supplier: "Proveedor",
      description: "Descripción",
      serialNumber: "Número de Serie",
      purchaseDate: "Fecha de Compra",
      warranty: "Garantía",
      inStock: "En Stock",
      lowStock: "Stock Bajo",
      outOfStock: "Sin Stock",
      totalItems: "Total de Artículos",
      totalValue: "Valor Total",
      categories: {
        hardware: "Hardware",
        software: "Software",
        network: "Red",
        peripherals: "Periféricos",
        accessories: "Accesorios",
        other: "Otros",
      },
    },
    settings: {
      title: "Ajustes",
      subtitle: "Gestione sus preferencias",
      appearance: "Apariencia",
      account: "Cuenta",
      security: "Seguridad",
      integrations: "Integraciones",
      language: "Idioma",
      theme: "Tema",
      darkMode: "Modo Oscuro",
      lightMode: "Modo Claro",
      wallpaper: "Fondo de Pantalla",
      transparency: "Transparencia",
      changePassword: "Cambiar Contraseña",
      currentPassword: "Contraseña Actual",
      newPassword: "Nueva Contraseña",
      passwordRequirements: "Mínimo 8 caracteres con mayúsculas, minúsculas, números y símbolos",
      selectLanguage: "Seleccionar Idioma",
      languageChanged: "Idioma cambiado exitosamente",
      themeChanged: "Tema cambiado exitosamente",
      passwordChanged: "Contraseña cambiada exitosamente",
      accountInfo: "Información de la Cuenta",
      connectedApps: "Apps Conectadas",
      connect: "Conectar",
      disconnect: "Desconectar",
      connected: "Conectado",
      notConnected: "No Conectado",
    },
    calendar: {
      title: "Calendario",
      subtitle: "Gestione sus citas y eventos",
      addEvent: "Añadir Evento",
      editEvent: "Editar Evento",
      deleteEvent: "Eliminar Evento",
      eventTitle: "Título del Evento",
      eventDescription: "Descripción",
      startDate: "Fecha de Inicio",
      endDate: "Fecha de Fin",
      startTime: "Hora de Inicio",
      endTime: "Hora de Fin",
      allDay: "Todo el Día",
      recurring: "Recurrente",
      reminder: "Recordatorio",
      personal: "Personal",
      team: "Equipo",
      priority: {
        low: "Baja",
        medium: "Media",
        high: "Alta",
      },
      today: "Hoy",
      week: "Semana",
      month: "Mes",
    },
    finance: {
      title: "Finanzas",
      subtitle: "Controle sus finanzas personales",
      income: "Ingresos",
      expenses: "Gastos",
      balance: "Saldo",
      budget: "Presupuesto",
      category: "Categoría",
      amount: "Monto",
      date: "Fecha",
      description: "Descripción",
      addTransaction: "Añadir Transacción",
      editTransaction: "Editar Transacción",
      monthlySummary: "Resumen Mensual",
      yearlyOverview: "Vista Anual",
      savingsGoal: "Meta de Ahorro",
      spendingLimit: "Límite de Gastos",
    },
    team: {
      title: "Equipo",
      subtitle: "Gestione su equipo y permisos",
      addMember: "Añadir Miembro",
      editMember: "Editar Miembro",
      removeMember: "Eliminar Miembro",
      memberName: "Nombre del Miembro",
      role: "Rol",
      permissions: "Permisos",
      status: "Estado",
      active: "Activo",
      inactive: "Inactivo",
      pending: "Pendiente",
      admin: "Administrador",
      manager: "Gerente",
      user: "Usuario",
      inviteMember: "Invitar Miembro",
      totalMembers: "Total de Miembros",
      onlineNow: "En Línea Ahora",
    },
    notes: {
      title: "Notas",
      subtitle: "Sus notas y recordatorios",
      addNote: "Añadir Nota",
      editNote: "Editar Nota",
      deleteNote: "Eliminar Nota",
      noteTitle: "Título",
      noteContent: "Contenido",
      quickNotes: "Bloc de Notas Rápido",
      pinned: "Fijadas",
      archived: "Archivadas",
      tags: "Etiquetas",
      lastModified: "Última Modificación",
    },
    communication: {
      title: "Comunicación",
      subtitle: "Chat y mensajes del equipo",
      channels: "Canales",
      directMessages: "Mensajes Directos",
      newChannel: "Nuevo Canal",
      newMessage: "Nuevo Mensaje",
      members: "Miembros",
      online: "En Línea",
      offline: "Desconectado",
      typing: "escribiendo...",
      sendMessage: "Enviar Mensaje",
      attachFile: "Adjuntar Archivo",
    },
    requests: {
      title: "Solicitudes",
      subtitle: "Gestione solicitudes y pedidos",
      newRequest: "Nueva Solicitud",
      pending: "Pendientes",
      approved: "Aprobadas",
      rejected: "Rechazadas",
      inProgress: "En Progreso",
      completed: "Completadas",
      requestType: "Tipo",
      priority: "Prioridad",
      assignedTo: "Asignado A",
      dueDate: "Fecha Límite",
      comments: "Comentarios",
    },
    analytics: {
      title: "Análisis",
      subtitle: "Informes y estadísticas",
      overview: "Resumen",
      reports: "Informes",
      trends: "Tendencias",
      performance: "Rendimiento",
      weekly: "Semanal",
      monthly: "Mensual",
      yearly: "Anual",
      export: "Exportar",
      generateReport: "Generar Informe",
    },
    errors: {
      generic: "Ocurrió un error inesperado",
      network: "Error de conexión",
      unauthorized: "Acceso no autorizado",
      notFound: "Recurso no encontrado",
      serverError: "Error del servidor",
      validation: "Error de validación",
      timeout: "Tiempo de espera agotado",
      tooManyRequests: "Demasiados intentos. Espere",
    },
  },
  "fr-FR": {
    common: {
      back: "Retour",
      save: "Enregistrer",
      cancel: "Annuler",
      delete: "Supprimer",
      edit: "Modifier",
      add: "Ajouter",
      search: "Rechercher",
      filter: "Filtrer",
      export: "Exporter",
      loading: "Chargement...",
      noResults: "Aucun résultat",
      success: "Succès",
      error: "Erreur",
      confirm: "Confirmer",
      close: "Fermer",
      yes: "Oui",
      no: "Non",
      all: "Tout",
      none: "Aucun",
      select: "Sélectionner",
      upload: "Téléverser",
      download: "Télécharger",
      copy: "Copier",
      share: "Partager",
      settings: "Paramètres",
      logout: "Déconnexion",
      profile: "Profil",
      notifications: "Notifications",
      help: "Aide",
      view: "Voir",
      create: "Créer",
      update: "Mettre à jour",
      remove: "Supprimer",
      refresh: "Actualiser",
      apply: "Appliquer",
      reset: "Réinitialiser",
    },
    auth: {
      login: "Connexion",
      register: "S'inscrire",
      email: "Email",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      forgotPassword: "Mot de passe oublié?",
      rememberMe: "Se souvenir de moi",
      loginTitle: "Bienvenue",
      loginSubtitle: "Entrez vos identifiants pour accéder",
      registerTitle: "Créer un compte admin",
      registerSubtitle: "Remplissez vos informations",
      name: "Nom complet",
      phone: "Téléphone",
      department: "Département",
      loginButton: "Accéder au système",
      registerButton: "Créer un compte",
      noAccount: "Pas de compte?",
      hasAccount: "Déjà un compte?",
      invalidCredentials: "Email ou mot de passe invalide",
      passwordMismatch: "Les mots de passe ne correspondent pas",
      weakPassword: "Mot de passe trop faible",
      emailExists: "Cet email est déjà enregistré",
      logoutSuccess: "Déconnexion réussie",
      loginSuccess: "Connexion réussie",
      registerSuccess: "Compte créé avec succès",
    },
    navigation: {
      dashboard: "Tableau de bord",
      inventory: "Inventaire",
      analytics: "Analyses",
      requests: "Demandes",
      communication: "Communication",
      calendar: "Calendrier",
      friends: "Amis et Groupes",
      notes: "Notes",
      finance: "Finances",
      code: "Code",
      integrations: "Intégrations",
      team: "Équipe",
      settings: "Paramètres",
      stockManagement: "Gestion des Stocks",
    },
    dashboard: {
      title: "Tableau de Bord",
      welcome: "Bienvenue",
      overview: "Vue d'ensemble",
      quickActions: "Actions Rapides",
      recentActivity: "Activité Récente",
      totalItems: "Total des Articles",
      lowStock: "Stock Faible",
      pendingRequests: "Demandes en Attente",
      teamMembers: "Membres de l'Équipe",
      totalValue: "Valeur Totale",
      monthlyGrowth: "Croissance Mensuelle",
    },
    inventory: {
      title: "Inventaire",
      subtitle: "Gérez tous les articles",
      addItem: "Ajouter un Article",
      editItem: "Modifier l'Article",
      deleteItem: "Supprimer l'Article",
      itemName: "Nom de l'Article",
      category: "Catégorie",
      quantity: "Quantité",
      price: "Prix",
      status: "Statut",
      location: "Emplacement",
      supplier: "Fournisseur",
      description: "Description",
      serialNumber: "Numéro de Série",
      purchaseDate: "Date d'Achat",
      warranty: "Garantie",
      inStock: "En Stock",
      lowStock: "Stock Faible",
      outOfStock: "Rupture de Stock",
      totalItems: "Total des Articles",
      totalValue: "Valeur Totale",
      categories: {
        hardware: "Matériel",
        software: "Logiciel",
        network: "Réseau",
        peripherals: "Périphériques",
        accessories: "Accessoires",
        other: "Autres",
      },
    },
    settings: {
      title: "Paramètres",
      subtitle: "Gérez vos préférences",
      appearance: "Apparence",
      account: "Compte",
      security: "Sécurité",
      integrations: "Intégrations",
      language: "Langue",
      theme: "Thème",
      darkMode: "Mode Sombre",
      lightMode: "Mode Clair",
      wallpaper: "Fond d'écran",
      transparency: "Transparence",
      changePassword: "Changer le Mot de Passe",
      currentPassword: "Mot de Passe Actuel",
      newPassword: "Nouveau Mot de Passe",
      passwordRequirements: "Minimum 8 caractères avec majuscules, minuscules, chiffres et symboles",
      selectLanguage: "Sélectionner la Langue",
      languageChanged: "Langue changée avec succès",
      themeChanged: "Thème changé avec succès",
      passwordChanged: "Mot de passe changé avec succès",
      accountInfo: "Informations du Compte",
      connectedApps: "Apps Connectées",
      connect: "Connecter",
      disconnect: "Déconnecter",
      connected: "Connecté",
      notConnected: "Non Connecté",
    },
    calendar: {
      title: "Calendrier",
      subtitle: "Gérez vos rendez-vous",
      addEvent: "Ajouter un Événement",
      editEvent: "Modifier l'Événement",
      deleteEvent: "Supprimer l'Événement",
      eventTitle: "Titre de l'Événement",
      eventDescription: "Description",
      startDate: "Date de Début",
      endDate: "Date de Fin",
      startTime: "Heure de Début",
      endTime: "Heure de Fin",
      allDay: "Toute la Journée",
      recurring: "Récurrent",
      reminder: "Rappel",
      personal: "Personnel",
      team: "Équipe",
      priority: {
        low: "Basse",
        medium: "Moyenne",
        high: "Haute",
      },
      today: "Aujourd'hui",
      week: "Semaine",
      month: "Mois",
    },
    finance: {
      title: "Finances",
      subtitle: "Contrôlez vos finances",
      income: "Revenus",
      expenses: "Dépenses",
      balance: "Solde",
      budget: "Budget",
      category: "Catégorie",
      amount: "Montant",
      date: "Date",
      description: "Description",
      addTransaction: "Ajouter une Transaction",
      editTransaction: "Modifier la Transaction",
      monthlySummary: "Résumé Mensuel",
      yearlyOverview: "Vue Annuelle",
      savingsGoal: "Objectif d'Épargne",
      spendingLimit: "Limite de Dépenses",
    },
    team: {
      title: "Équipe",
      subtitle: "Gérez votre équipe",
      addMember: "Ajouter un Membre",
      editMember: "Modifier le Membre",
      removeMember: "Supprimer le Membre",
      memberName: "Nom du Membre",
      role: "Rôle",
      permissions: "Permissions",
      status: "Statut",
      active: "Actif",
      inactive: "Inactif",
      pending: "En Attente",
      admin: "Administrateur",
      manager: "Gestionnaire",
      user: "Utilisateur",
      inviteMember: "Inviter un Membre",
      totalMembers: "Total des Membres",
      onlineNow: "En Ligne",
    },
    notes: {
      title: "Notes",
      subtitle: "Vos notes et rappels",
      addNote: "Ajouter une Note",
      editNote: "Modifier la Note",
      deleteNote: "Supprimer la Note",
      noteTitle: "Titre",
      noteContent: "Contenu",
      quickNotes: "Bloc-Notes Rapide",
      pinned: "Épinglées",
      archived: "Archivées",
      tags: "Tags",
      lastModified: "Dernière Modification",
    },
    communication: {
      title: "Communication",
      subtitle: "Chat et messages d'équipe",
      channels: "Canaux",
      directMessages: "Messages Directs",
      newChannel: "Nouveau Canal",
      newMessage: "Nouveau Message",
      members: "Membres",
      online: "En Ligne",
      offline: "Hors Ligne",
      typing: "écrit...",
      sendMessage: "Envoyer le Message",
      attachFile: "Joindre un Fichier",
    },
    requests: {
      title: "Demandes",
      subtitle: "Gérez les demandes",
      newRequest: "Nouvelle Demande",
      pending: "En Attente",
      approved: "Approuvées",
      rejected: "Rejetées",
      inProgress: "En Cours",
      completed: "Terminées",
      requestType: "Type",
      priority: "Priorité",
      assignedTo: "Assigné À",
      dueDate: "Date Limite",
      comments: "Commentaires",
    },
    analytics: {
      title: "Analyses",
      subtitle: "Rapports et statistiques",
      overview: "Vue d'Ensemble",
      reports: "Rapports",
      trends: "Tendances",
      performance: "Performance",
      weekly: "Hebdomadaire",
      monthly: "Mensuel",
      yearly: "Annuel",
      export: "Exporter",
      generateReport: "Générer un Rapport",
    },
    errors: {
      generic: "Une erreur inattendue s'est produite",
      network: "Erreur de connexion",
      unauthorized: "Accès non autorisé",
      notFound: "Ressource non trouvée",
      serverError: "Erreur serveur",
      validation: "Erreur de validation",
      timeout: "Délai d'attente dépassé",
      tooManyRequests: "Trop de tentatives. Patientez",
    },
  },
  "de-DE": {
    common: {
      back: "Zurück",
      save: "Speichern",
      cancel: "Abbrechen",
      delete: "Löschen",
      edit: "Bearbeiten",
      add: "Hinzufügen",
      search: "Suchen",
      filter: "Filtern",
      export: "Exportieren",
      loading: "Laden...",
      noResults: "Keine Ergebnisse",
      success: "Erfolg",
      error: "Fehler",
      confirm: "Bestätigen",
      close: "Schließen",
      yes: "Ja",
      no: "Nein",
      all: "Alle",
      none: "Keine",
      select: "Auswählen",
      upload: "Hochladen",
      download: "Herunterladen",
      copy: "Kopieren",
      share: "Teilen",
      settings: "Einstellungen",
      logout: "Abmelden",
      profile: "Profil",
      notifications: "Benachrichtigungen",
      help: "Hilfe",
      view: "Ansehen",
      create: "Erstellen",
      update: "Aktualisieren",
      remove: "Entfernen",
      refresh: "Aktualisieren",
      apply: "Anwenden",
      reset: "Zurücksetzen",
    },
    auth: {
      login: "Anmelden",
      register: "Registrieren",
      email: "E-Mail",
      password: "Passwort",
      confirmPassword: "Passwort bestätigen",
      forgotPassword: "Passwort vergessen?",
      rememberMe: "Angemeldet bleiben",
      loginTitle: "Willkommen zurück",
      loginSubtitle: "Geben Sie Ihre Anmeldedaten ein",
      registerTitle: "Admin-Konto erstellen",
      registerSubtitle: "Füllen Sie Ihre Daten aus",
      name: "Vollständiger Name",
      phone: "Telefon",
      department: "Abteilung",
      loginButton: "System zugreifen",
      registerButton: "Konto erstellen",
      noAccount: "Kein Konto?",
      hasAccount: "Schon ein Konto?",
      invalidCredentials: "Ungültige E-Mail oder Passwort",
      passwordMismatch: "Passwörter stimmen nicht überein",
      weakPassword: "Passwort zu schwach",
      emailExists: "Diese E-Mail ist bereits registriert",
      logoutSuccess: "Erfolgreich abgemeldet",
      loginSuccess: "Erfolgreich angemeldet",
      registerSuccess: "Konto erfolgreich erstellt",
    },
    navigation: {
      dashboard: "Dashboard",
      inventory: "Inventar",
      analytics: "Analysen",
      requests: "Anfragen",
      communication: "Kommunikation",
      calendar: "Kalender",
      friends: "Freunde & Gruppen",
      notes: "Notizen",
      finance: "Finanzen",
      code: "Code",
      integrations: "Integrationen",
      team: "Team",
      settings: "Einstellungen",
      stockManagement: "Lagerverwaltung",
    },
    dashboard: {
      title: "Dashboard",
      welcome: "Willkommen",
      overview: "Übersicht",
      quickActions: "Schnellaktionen",
      recentActivity: "Letzte Aktivität",
      totalItems: "Gesamtartikel",
      lowStock: "Niedriger Bestand",
      pendingRequests: "Ausstehende Anfragen",
      teamMembers: "Teammitglieder",
      totalValue: "Gesamtwert",
      monthlyGrowth: "Monatliches Wachstum",
    },
    inventory: {
      title: "Inventar",
      subtitle: "Alle Artikel verwalten",
      addItem: "Artikel hinzufügen",
      editItem: "Artikel bearbeiten",
      deleteItem: "Artikel löschen",
      itemName: "Artikelname",
      category: "Kategorie",
      quantity: "Menge",
      price: "Preis",
      status: "Status",
      location: "Standort",
      supplier: "Lieferant",
      description: "Beschreibung",
      serialNumber: "Seriennummer",
      purchaseDate: "Kaufdatum",
      warranty: "Garantie",
      inStock: "Auf Lager",
      lowStock: "Niedriger Bestand",
      outOfStock: "Nicht auf Lager",
      totalItems: "Gesamtartikel",
      totalValue: "Gesamtwert",
      categories: {
        hardware: "Hardware",
        software: "Software",
        network: "Netzwerk",
        peripherals: "Peripheriegeräte",
        accessories: "Zubehör",
        other: "Sonstiges",
      },
    },
    settings: {
      title: "Einstellungen",
      subtitle: "Verwalten Sie Ihre Präferenzen",
      appearance: "Erscheinungsbild",
      account: "Konto",
      security: "Sicherheit",
      integrations: "Integrationen",
      language: "Sprache",
      theme: "Thema",
      darkMode: "Dunkler Modus",
      lightMode: "Heller Modus",
      wallpaper: "Hintergrundbild",
      transparency: "Transparenz",
      changePassword: "Passwort ändern",
      currentPassword: "Aktuelles Passwort",
      newPassword: "Neues Passwort",
      passwordRequirements: "Mindestens 8 Zeichen mit Groß-, Kleinbuchstaben, Zahlen und Symbolen",
      selectLanguage: "Sprache auswählen",
      languageChanged: "Sprache erfolgreich geändert",
      themeChanged: "Thema erfolgreich geändert",
      passwordChanged: "Passwort erfolgreich geändert",
      accountInfo: "Kontoinformationen",
      connectedApps: "Verbundene Apps",
      connect: "Verbinden",
      disconnect: "Trennen",
      connected: "Verbunden",
      notConnected: "Nicht Verbunden",
    },
    calendar: {
      title: "Kalender",
      subtitle: "Verwalten Sie Ihre Termine",
      addEvent: "Ereignis hinzufügen",
      editEvent: "Ereignis bearbeiten",
      deleteEvent: "Ereignis löschen",
      eventTitle: "Ereignistitel",
      eventDescription: "Beschreibung",
      startDate: "Startdatum",
      endDate: "Enddatum",
      startTime: "Startzeit",
      endTime: "Endzeit",
      allDay: "Ganztägig",
      recurring: "Wiederkehrend",
      reminder: "Erinnerung",
      personal: "Persönlich",
      team: "Team",
      priority: {
        low: "Niedrig",
        medium: "Mittel",
        high: "Hoch",
      },
      today: "Heute",
      week: "Woche",
      month: "Monat",
    },
    finance: {
      title: "Finanzen",
      subtitle: "Kontrollieren Sie Ihre Finanzen",
      income: "Einnahmen",
      expenses: "Ausgaben",
      balance: "Saldo",
      budget: "Budget",
      category: "Kategorie",
      amount: "Betrag",
      date: "Datum",
      description: "Beschreibung",
      addTransaction: "Transaktion hinzufügen",
      editTransaction: "Transaktion bearbeiten",
      monthlySummary: "Monatliche Zusammenfassung",
      yearlyOverview: "Jahresübersicht",
      savingsGoal: "Sparziel",
      spendingLimit: "Ausgabenlimit",
    },
    team: {
      title: "Team",
      subtitle: "Verwalten Sie Ihr Team",
      addMember: "Mitglied hinzufügen",
      editMember: "Mitglied bearbeiten",
      removeMember: "Mitglied entfernen",
      memberName: "Mitgliedername",
      role: "Rolle",
      permissions: "Berechtigungen",
      status: "Status",
      active: "Aktiv",
      inactive: "Inaktiv",
      pending: "Ausstehend",
      admin: "Administrator",
      manager: "Manager",
      user: "Benutzer",
      inviteMember: "Mitglied einladen",
      totalMembers: "Gesamtmitglieder",
      onlineNow: "Jetzt Online",
    },
    notes: {
      title: "Notizen",
      subtitle: "Ihre Notizen und Erinnerungen",
      addNote: "Notiz hinzufügen",
      editNote: "Notiz bearbeiten",
      deleteNote: "Notiz löschen",
      noteTitle: "Titel",
      noteContent: "Inhalt",
      quickNotes: "Schnellnotizen",
      pinned: "Angeheftet",
      archived: "Archiviert",
      tags: "Tags",
      lastModified: "Zuletzt Geändert",
    },
    communication: {
      title: "Kommunikation",
      subtitle: "Team-Chat und Nachrichten",
      channels: "Kanäle",
      directMessages: "Direktnachrichten",
      newChannel: "Neuer Kanal",
      newMessage: "Neue Nachricht",
      members: "Mitglieder",
      online: "Online",
      offline: "Offline",
      typing: "schreibt...",
      sendMessage: "Nachricht senden",
      attachFile: "Datei anhängen",
    },
    requests: {
      title: "Anfragen",
      subtitle: "Anfragen verwalten",
      newRequest: "Neue Anfrage",
      pending: "Ausstehend",
      approved: "Genehmigt",
      rejected: "Abgelehnt",
      inProgress: "In Bearbeitung",
      completed: "Abgeschlossen",
      requestType: "Typ",
      priority: "Priorität",
      assignedTo: "Zugewiesen An",
      dueDate: "Fälligkeitsdatum",
      comments: "Kommentare",
    },
    analytics: {
      title: "Analysen",
      subtitle: "Berichte und Statistiken",
      overview: "Übersicht",
      reports: "Berichte",
      trends: "Trends",
      performance: "Leistung",
      weekly: "Wöchentlich",
      monthly: "Monatlich",
      yearly: "Jährlich",
      export: "Exportieren",
      generateReport: "Bericht generieren",
    },
    errors: {
      generic: "Ein unerwarteter Fehler ist aufgetreten",
      network: "Verbindungsfehler",
      unauthorized: "Unbefugter Zugriff",
      notFound: "Ressource nicht gefunden",
      serverError: "Serverfehler",
      validation: "Validierungsfehler",
      timeout: "Zeitüberschreitung",
      tooManyRequests: "Zu viele Versuche. Bitte warten",
    },
  },
}

export const localeNames: Record<Locale, string> = {
  "pt-BR": "Português (Brasil)",
  "en-US": "English (US)",
  "es-ES": "Español (España)",
  "fr-FR": "Français (France)",
  "de-DE": "Deutsch (Deutschland)",
}

export const localeFlags: Record<Locale, string> = {
  "pt-BR": "🇧🇷",
  "en-US": "🇺🇸",
  "es-ES": "🇪🇸",
  "fr-FR": "🇫🇷",
  "de-DE": "🇩🇪",
}
