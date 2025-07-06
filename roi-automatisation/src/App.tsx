import { useState, useEffect } from 'react'
import './App.css'
import ProjectionChart from './components/ProjectionChart'
import CountUp from './components/CountUp'

interface Task {
  id: number;
  name: string;
  timePerTask: number;
  frequencyPerWeek: number;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "Gestion des emails", timePerTask: 20, frequencyPerWeek: 5 },
    { id: 2, name: "Saisie de données", timePerTask: 30, frequencyPerWeek: 3 }
  ]);
  const [hourlyCost, setHourlyCost] = useState(35);
  const [isVisible, setIsVisible] = useState(false);
  const [nextId, setNextId] = useState(3);

  // Calcul du coût total
  const costPerDay = tasks.reduce((total, task) => {
    return total + (task.timePerTask / 60) * task.frequencyPerWeek * hourlyCost / 5;
  }, 0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const monthlySavings = costPerDay * 22;
  const yearlySavings = monthlySavings * 12;
  
  const totalTimePerMonth = tasks.reduce((total, task) => {
    return total + (task.timePerTask * task.frequencyPerWeek * 4.33) / 60;
  }, 0);
  const daysPerYear = totalTimePerMonth * 12 / 8;


  const addTask = () => {
    setTasks([...tasks, { 
      id: nextId, 
      name: "", 
      timePerTask: 15, 
      frequencyPerWeek: 5 
    }]);
    setNextId(nextId + 1);
  };

  const updateTask = (id: number, field: keyof Task, value: string | number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, [field]: value } : task
    ));
  };

  const removeTask = (id: number) => {
    if (tasks.length > 1) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
      {/* Gradient de fond sophistiqué */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505] to-[#000000]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#2d1b69]/5 via-transparent to-[#e91e8c]/5"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#8b5cf6]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Particules animées en arrière-plan */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      {/* Grille de fond très subtile */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
      
      {/* Hero Section */}
      <section className="py-16 px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-white">Combien perdez-vous</span>
            <br />
            <span className="text-[#e91e8c] animate-pulse-glow">sans automatisation ?</span>
          </h1>
          <p className={`text-xl text-gray-400 mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Découvrez le vrai coût de vos tâches répétitives
          </p>
          
          {/* Compteur en temps réel */}
          <div className={`inline-block bg-red-900/20 border border-red-500/30 rounded-lg px-8 py-6 backdrop-blur transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} hover:scale-105 hover:border-red-500/50`}>
            <p className="text-lg text-gray-400 mb-2">Vous perdez actuellement</p>
            <div className="text-5xl md:text-6xl font-bold text-[#e91e8c]">
              <CountUp end={monthlySavings} duration={2000} suffix="€" />
              <span className="text-2xl ml-2">par mois</span>
            </div>
          </div>
        </div>
      </section>

      {/* Calculateur principal */}
      <section className="max-w-6xl mx-auto px-4 pb-16 relative">
        <div className={`bg-gray-900/50 backdrop-blur rounded-2xl p-8 border border-gray-800 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl font-bold text-center mb-8">
            Configurez vos tâches répétitives
          </h2>

          {/* Coût horaire global */}
          <div className="mb-8 max-w-sm mx-auto">
            <label className="block text-sm font-medium mb-2 text-gray-400">
              Coût horaire moyen dans votre entreprise (€/h)
            </label>
            <input
              type="number"
              min="10"
              max="200"
              value={hourlyCost}
              onChange={(e) => setHourlyCost(Number(e.target.value) || 0)}
              className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white text-lg font-semibold text-center focus:border-[#8b5cf6] focus:outline-none transition-all hover:bg-black/70"
            />
          </div>
          
          {/* En-tête avec bouton ajouter */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-300 mb-3">Vos tâches répétitives</h3>
            <button
              onClick={addTask}
              className="w-full md:w-auto px-4 py-2 border-2 border-[#8b5cf6] text-[#8b5cf6] font-semibold rounded-lg hover:bg-[#8b5cf6] hover:text-white transition-all hover:shadow-lg hover:shadow-purple-500/20"
            >
              + Ajouter une tâche
            </button>
          </div>
          
          {/* Liste des tâches */}
          <div className="space-y-4 mb-8">
            {tasks.map((task) => {
              const colors = ['#8b5cf6', '#e91e8c', '#06b6d4', '#10b981', '#f59e0b'];
              const taskColor = task.name ? colors[tasks.filter(t => t.name).indexOf(task) % colors.length] : '#666';
              
              return (
                <div key={task.id} className="bg-black/30 p-4 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-all animate-fade-in">
                  <div className="grid md:grid-cols-4 gap-4 items-end">
                    <div className="md:col-span-1 flex items-end gap-2">
                      <div 
                        className="w-4 h-4 rounded-full mb-2 flex-shrink-0" 
                        style={{ backgroundColor: taskColor }}
                      ></div>
                      <div className="flex-1">
                        <label className="block text-xs font-medium mb-1 text-gray-500">
                          Nom de la tâche
                        </label>
                        <input
                          type="text"
                          value={task.name}
                          onChange={(e) => updateTask(task.id, 'name', e.target.value)}
                          placeholder="Ex: Gestion emails"
                          className="w-full px-3 py-2 bg-black/50 border border-gray-700 rounded text-white placeholder-gray-500 focus:border-[#8b5cf6] focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-500">
                      Durée (min)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="480"
                      value={task.timePerTask}
                      onChange={(e) => updateTask(task.id, 'timePerTask', Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-black/50 border border-gray-700 rounded text-white text-center focus:border-[#8b5cf6] focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-500">
                      Fois/semaine
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={task.frequencyPerWeek}
                      onChange={(e) => updateTask(task.id, 'frequencyPerWeek', Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-black/50 border border-gray-700 rounded text-white text-center focus:border-[#8b5cf6] focus:outline-none transition-all"
                    />
                  </div>
                  <div className="flex items-center justify-end">
                    {tasks.length > 1 && (
                      <button
                        onClick={() => removeTask(task.id)}
                        className="px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-all"
                        title="Supprimer cette tâche"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              </div>
              );
            })}
          </div>


          {/* Graphique */}
          <div className="bg-black/50 rounded-xl p-6 mb-8 transition-all hover:shadow-2xl hover:shadow-purple-500/10">
            <ProjectionChart tasks={tasks} hourlyCost={hourlyCost} />
          </div>

          {/* Résultats */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#2d1b69] to-[#8b5cf6] p-6 rounded-xl transform transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30">
              <h3 className="text-lg font-semibold mb-2">Économies annuelles</h3>
              <p className="text-4xl font-bold">
                <CountUp end={yearlySavings} duration={1500} suffix="€" />
              </p>
              <p className="text-sm opacity-80 mt-1">
                soit <CountUp end={monthlySavings} duration={1500} suffix="€/mois" />
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#e91e8c] to-pink-500 p-6 rounded-xl transform transition-all hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/30">
              <h3 className="text-lg font-semibold mb-2">Temps récupéré/an</h3>
              <p className="text-4xl font-bold">
                <CountUp end={Math.round(daysPerYear)} duration={1500} suffix=" jours" />
              </p>
              <p className="text-sm opacity-80 mt-1">
                soit <CountUp end={Math.round(totalTimePerMonth)} duration={1500} suffix="h/mois" />
              </p>
            </div>
          </div>

          {/* Message d'impact avec détail des tâches */}
          {yearlySavings > 5000 && (
            <div className="mt-8 space-y-3">
              <div className="p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg animate-fade-in">
                <p className="text-lg font-semibold text-purple-300 mb-3">
                  💰 Détail par tâche (économies mensuelles) :
                </p>
                <div className="space-y-3">
                  {tasks.filter(t => t.name).map(task => {
                    const taskMonthlyCost = (task.timePerTask / 60) * task.frequencyPerWeek * hourlyCost * 4.33;
                    const taskHoursPerMonth = (task.timePerTask * task.frequencyPerWeek * 4.33) / 60;
                    return (
                      <div key={task.id} className="bg-black/30 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-white">{task.name}</span>
                          <span className="text-xl font-bold text-[#e91e8c]">{taskMonthlyCost.toFixed(0)}€/mois</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {taskHoursPerMonth.toFixed(1)}h/mois • {task.timePerTask}min × {task.frequencyPerWeek}fois/sem
                        </div>
                      </div>
                    );
                  })}
                  <div className="border-t border-gray-700 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-white">TOTAL</span>
                      <span className="text-2xl font-bold text-white">{monthlySavings.toFixed(0)}€/mois</span>
                    </div>
                  </div>
                </div>
              </div>
              {yearlySavings > 30000 && (
                <div className="p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-lg text-center animate-fade-in">
                  <p className="text-lg font-semibold text-green-300">
                    🚀 Avec {yearlySavings.toFixed(0)}€ d'économies, vous pourriez embaucher {Math.floor(yearlySavings / 30000)} personne(s) supplémentaire(s) !
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Section bénéfices */}
      <section className="max-w-6xl mx-auto px-4 pb-16 relative">
        <h2 className="text-3xl font-bold text-center mb-12 animate-slide-up">
          Les bénéfices de l'automatisation
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="benefit-card bg-gray-900/50 backdrop-blur p-6 rounded-xl border border-gray-800 text-center hover:border-[#8b5cf6] transition-all hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="text-4xl mb-4 animate-bounce-slow">⚡</div>
            <h3 className="text-xl font-bold mb-2">Zéro erreur</h3>
            <p className="text-gray-400">Précision de 100% sur vos processus critiques</p>
          </div>
          <div className="benefit-card bg-gray-900/50 backdrop-blur p-6 rounded-xl border border-gray-800 text-center hover:border-[#e91e8c] transition-all hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/20 animation-delay-200">
            <div className="text-4xl mb-4 animate-bounce-slow">🚀</div>
            <h3 className="text-xl font-bold mb-2">Scalabilité</h3>
            <p className="text-gray-400">10x plus de volume sans recruter</p>
          </div>
          <div className="benefit-card bg-gray-900/50 backdrop-blur p-6 rounded-xl border border-gray-800 text-center hover:border-[#8b5cf6] transition-all hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 animation-delay-400">
            <div className="text-4xl mb-4 animate-bounce-slow">😊</div>
            <h3 className="text-xl font-bold mb-2">Équipes heureuses</h3>
            <p className="text-gray-400">Focus sur les tâches à valeur ajoutée</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App