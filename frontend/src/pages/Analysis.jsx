// import { useState } from 'react';
// import axios from 'axios';
// import {
//   Activity,
//   AlertTriangle,
//   CheckCircle,
//   XCircle,
//   Clock,
//   TrendingUp,
//   Shield,
//   Database,
//   Cpu,
//   HardDrive,
//   Zap,
//   FileText,
//   ExternalLink,
//   Youtube,
//   BookOpen,
//   PlayCircle,
//   ChevronDown,
//   ChevronUp,
//   Info,
//   AlertCircle,
//   Target,
//   Eye,
//   Lightbulb,
//   BarChart3,
//   Settings
// } from 'lucide-react';

const LogAnalyzer = () => {
  const [events, setEvents] = useState([]);
//   const [analysis, setAnalysis] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [expandedActions, setExpandedActions] = useState({});

  const analyzeEvents = async () => {
    setLoading(true);
    setError(null);
    
    try {
    
      // Call backend API
      if (response.data.success) {
        setAnalysis(response.data.data);
      } else {
        // Handle fallback analysis from parsing errors
        if (response.data.fallback_analysis) {
          setAnalysis(response.data.fallback_analysis);
          setError(`${response.data.error}: ${response.data.details?.suggestion || 'Please try again'}`);
        } else {
          setError(response.data.error || 'Analysis failed');
        }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.suggestion || 
                          err.message || 
                          'Failed to analyze logs';
      setError(errorMessage);
      // console.error('Analysis error:', err);
      
      // Log detailed error info for debugging
      if (err.response?.data) {
        // console.error('Error details:', err.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

//   const getSeverityConfig = (severity) => {
//     const configs = {
//       'HEALTHY': { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle },
//       'INFO': { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', icon: Info },
//       'WARNING': { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', icon: AlertTriangle },
//       'ERROR': { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: XCircle },
//       'CRITICAL': { color: 'text-red-700', bg: 'bg-red-100', border: 'border-red-300', icon: AlertCircle },
//       'LOW': { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle },
//       'MEDIUM': { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', icon: AlertTriangle },
//       'HIGH': { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: AlertCircle }
//     };
//     return configs[severity] || { color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', icon: Info };
//   };

//   const getPriorityConfig = (priority) => {
//     const configs = {
//       'IMMEDIATE': { color: 'text-red-700', bg: 'bg-red-100', border: 'border-red-200' },
//       'HIGH': { color: 'text-orange-700', bg: 'bg-orange-100', border: 'border-orange-200' },
//       'MEDIUM': { color: 'text-yellow-700', bg: 'bg-yellow-100', border: 'border-yellow-200' },
//       'LOW': { color: 'text-green-700', bg: 'bg-green-100', border: 'border-green-200' }
//     };
//     return configs[priority] || { color: 'text-gray-700', bg: 'bg-gray-100', border: 'border-gray-200' };
//   };

//   const toggleAction = (index) => {
//     setExpandedActions(prev => ({
//       ...prev,
//       [index]: !prev[index]
//     }));
//   };

//   const getResourceIcon = (type) => {
//     switch(type) {
//       case 'video': return Youtube;
//       case 'article': return FileText;
//       case 'documentation': return BookOpen;
//       default: return ExternalLink;
//     }
//   };

//   return (
    // <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    //   <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    //     {/* Header */}
    //     <div className="text-center mb-8">
    //       <div className="flex items-center justify-center gap-3 mb-4">
    //         <Activity className="w-10 h-10 text-indigo-600" />
    //         <h1 className="text-4xl font-bold text-gray-900">System Log Analyzer</h1>
    //       </div>
    //       <p className="text-lg text-gray-600">AI-powered event analysis and anomaly detection</p>
    //     </div>

    //     {/* Action Button */}
    //     <div className="flex justify-center mb-8">
    //       <button
    //         onClick={analyzeEvents}
    //         disabled={loading}
    //         className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform transition hover:scale-105"
    //       >
    //         {loading ? (
    //           <>
    //             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
    //             Analyzing...
    //           </>
    //         ) : (
    //           <>
    //             <PlayCircle className="w-5 h-5" />
    //             Analyze System Logs
    //           </>
    //         )}
    //       </button>
    //     </div>

    //     {/* Error Alert */}
    //     {error && (
    //       <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-sm">
    //         <div className="flex items-start gap-3">
    //           <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
    //           <div>
    //             <h3 className="font-semibold text-red-900">Error</h3>
    //             <p className="text-red-700 mt-1">{error}</p>
    //           </div>
    //         </div>
    //       </div>
    //     )}

    //     {/* Loading State */}
    //     {loading && (
    //       <div className="bg-white rounded-xl shadow-lg p-8 text-center">
    //         <div className="flex flex-col items-center gap-4">
    //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    //           <p className="text-gray-600">Analyzing {events.length} events with AI...</p>
    //         </div>
    //       </div>
    //     )}

    //     {/* Analysis Results */}
    //     {analysis && !loading && (
    //       <div className="space-y-6">
    //         {/* Error/Warning Banner if present */}
    //         {analysis.error && (
    //           <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4 shadow-sm">
    //             <div className="flex items-start gap-3">
    //               <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
    //               <div>
    //                 <h3 className="font-semibold text-yellow-900">Partial Analysis</h3>
    //                 <p className="text-yellow-700 mt-1">{analysis.error}</p>
    //                 {analysis.parse_error && (
    //                   <p className="text-sm text-yellow-600 mt-2">
    //                     Technical details: {analysis.parse_error}
    //                   </p>
    //                 )}
    //               </div>
    //             </div>
    //           </div>
    //         )}

    //         {/* Overall Status Card */}
    //         <div className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${getSeverityConfig(analysis.severity).border}`}>
    //           <div className="p-6">
    //             <div className="flex items-start justify-between mb-4">
    //               <div className="flex items-center gap-3">
    //                 <Settings className="w-8 h-8 text-indigo-600" />
    //                 <h2 className="text-2xl font-bold text-gray-900">System Status</h2>
    //               </div>
    //               <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getSeverityConfig(analysis.severity).bg} ${getSeverityConfig(analysis.severity).color} font-semibold`}>
    //                 {React.createElement(getSeverityConfig(analysis.severity).icon, { className: "w-5 h-5" })}
    //                 {analysis.severity}
    //               </div>
    //             </div>

    //             <div className="flex items-center gap-2 text-gray-600 mb-4">
    //               <Clock className="w-4 h-4" />
    //               <span className="text-sm">{analysis.time_range_analyzed}</span>
    //             </div>

    //             <p className="text-gray-700 mb-6 leading-relaxed">{analysis.summary?.key_findings}</p>

    //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    //               <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4">
    //                 <div className="flex items-center gap-2 text-gray-600 mb-2">
    //                   <FileText className="w-4 h-4" />
    //                   <span className="text-sm font-medium">Total Events</span>
    //                 </div>
    //                 <div className="text-3xl font-bold text-indigo-600">{analysis.summary?.total_events}</div>
    //               </div>
    //               <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
    //                 <div className="flex items-center gap-2 text-gray-600 mb-2">
    //                   <BarChart3 className="w-4 h-4" />
    //                   <span className="text-sm font-medium">Event Types</span>
    //                 </div>
    //                 <div className="text-3xl font-bold text-purple-600">{analysis.summary?.event_types?.length || 0}</div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         {/* Risk Assessment */}
    //         {analysis.risk_assessment && (
    //           <div className="bg-white rounded-xl shadow-lg p-6">
    //             <div className="flex items-center gap-3 mb-6">
    //               <Shield className="w-6 h-6 text-indigo-600" />
    //               <h3 className="text-xl font-bold text-gray-900">Risk Assessment</h3>
    //             </div>

    //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    //               <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-4 border border-gray-200">
    //                 <div className="flex items-center gap-2 text-gray-600 mb-2">
    //                   <Zap className="w-4 h-4" />
    //                   <span className="text-sm font-medium">Crash Probability</span>
    //                 </div>
    //                 <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${getSeverityConfig(analysis.risk_assessment.crash_probability).bg} ${getSeverityConfig(analysis.risk_assessment.crash_probability).color} font-semibold text-sm`}>
    //                   {analysis.risk_assessment.crash_probability}
    //                 </div>
    //               </div>

    //               <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-4 border border-gray-200">
    //                 <div className="flex items-center gap-2 text-gray-600 mb-2">
    //                   <TrendingUp className="w-4 h-4" />
    //                   <span className="text-sm font-medium">Performance Impact</span>
    //                 </div>
    //                 <div className="font-semibold text-gray-900">{analysis.risk_assessment.performance_impact}</div>
    //               </div>

    //               <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-4 border border-gray-200">
    //                 <div className="flex items-center gap-2 text-gray-600 mb-2">
    //                   <Database className="w-4 h-4" />
    //                   <span className="text-sm font-medium">Data Integrity</span>
    //                 </div>
    //                 <div className="font-semibold text-gray-900">{analysis.risk_assessment.data_integrity}</div>
    //               </div>
    //             </div>

    //             {analysis.risk_assessment.security_concerns?.length > 0 && (
    //               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
    //                 <div className="flex items-start gap-3">
    //                   <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
    //                   <div>
    //                     <h4 className="font-semibold text-yellow-900 mb-2">Security Concerns</h4>
    //                     <ul className="space-y-1">
    //                       {analysis.risk_assessment.security_concerns.map((concern, idx) => (
    //                         <li key={idx} className="text-yellow-800 text-sm">{concern}</li>
    //                       ))}
    //                     </ul>
    //                   </div>
    //                 </div>
    //               </div>
    //             )}
    //           </div>
    //         )}

    //         {/* Events Breakdown */}
    //         {analysis.events_breakdown && analysis.events_breakdown.length > 0 && (
    //           <div className="bg-white rounded-xl shadow-lg p-6">
    //             <div className="flex items-center gap-3 mb-6">
    //               <FileText className="w-6 h-6 text-indigo-600" />
    //               <h3 className="text-xl font-bold text-gray-900">Events Breakdown</h3>
    //             </div>

    //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    //               {analysis.events_breakdown.map((event, idx) => {
    //                 const config = getSeverityConfig(event.severity);
    //                 return (
    //                   <div key={idx} className={`border ${config.border} rounded-lg p-4 hover:shadow-md transition-shadow`}>
    //                     <div className="flex items-start justify-between mb-3">
    //                       <span className="font-semibold text-gray-900 text-sm">{event.event_type}</span>
    //                       <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${config.bg} ${config.color}`}>
    //                         {React.createElement(config.icon, { className: "w-3 h-3" })}
    //                         {event.severity} ({event.count})
    //                       </div>
    //                     </div>
    //                     <p className="text-gray-700 text-sm mb-2">{event.description}</p>
    //                     <div className="flex items-start gap-2 text-xs text-gray-600 italic">
    //                       <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
    //                       <span>{event.why_logged}</span>
    //                     </div>
    //                   </div>
    //                 );
    //               })}
    //             </div>
    //           </div>
    //         )}

    //         {/* Anomalies */}
    //         {analysis.anomalies && analysis.anomalies.length > 0 && (
    //           <div className="bg-white rounded-xl shadow-lg p-6">
    //             <div className="flex items-center gap-3 mb-6">
    //               <AlertCircle className="w-6 h-6 text-red-600" />
    //               <h3 className="text-xl font-bold text-gray-900">Detected Anomalies</h3>
    //             </div>

    //             <div className="space-y-4">
    //               {analysis.anomalies.map((anomaly, idx) => {
    //                 const config = getSeverityConfig(anomaly.severity);
    //                 return (
    //                   <div key={idx} className={`bg-gradient-to-r ${config.bg} border-l-4 ${config.border} rounded-lg p-4`}>
    //                     <div className="flex items-start justify-between mb-2">
    //                       <h4 className="font-semibold text-gray-900">{anomaly.type}</h4>
    //                       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.color} bg-white border ${config.border}`}>
    //                         {anomaly.severity}
    //                       </span>
    //                     </div>
    //                     <p className="text-gray-700 mb-2">{anomaly.description}</p>
    //                     {anomaly.first_occurrence && (
    //                       <div className="flex items-center gap-2 text-sm text-gray-600">
    //                         <Clock className="w-4 h-4" />
    //                         First seen: {new Date(anomaly.first_occurrence).toLocaleString()}
    //                       </div>
    //                     )}
    //                   </div>
    //                 );
    //               })}
    //             </div>
    //           </div>
    //         )}

    //         {/* Recommended Actions */}
    //         {analysis.recommended_actions && analysis.recommended_actions.length > 0 && (
    //           <div className="bg-white rounded-xl shadow-lg p-6">
    //             <div className="flex items-center gap-3 mb-6">
    //               <Target className="w-6 h-6 text-green-600" />
    //               <h3 className="text-xl font-bold text-gray-900">Recommended Actions</h3>
    //             </div>

    //             <div className="space-y-4">
    //               {analysis.recommended_actions.map((action, idx) => {
    //                 const priorityConfig = getPriorityConfig(action.priority);
    //                 const isExpanded = expandedActions[idx];

    //                 return (
    //                   <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
    //                     <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4">
    //                       <div className="flex items-center gap-2 mb-3 flex-wrap">
    //                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${priorityConfig.bg} ${priorityConfig.color} border ${priorityConfig.border}`}>
    //                           {action.priority} PRIORITY
    //                         </span>
    //                         <div className="flex items-center gap-1 text-sm text-gray-600">
    //                           <Clock className="w-4 h-4" />
    //                           {action.estimated_time}
    //                         </div>
    //                         <div className="flex items-center gap-1 text-sm text-gray-600">
    //                           <BarChart3 className="w-4 h-4" />
    //                           {action.difficulty}
    //                         </div>
    //                       </div>
                          
    //                       <button
    //                         onClick={() => toggleAction(idx)}
    //                         className="w-full flex items-center justify-between text-left group"
    //                       >
    //                         <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
    //                           {action.action}
    //                         </h4>
    //                         {isExpanded ? (
    //                           <ChevronUp className="w-5 h-5 text-gray-400" />
    //                         ) : (
    //                           <ChevronDown className="w-5 h-5 text-gray-400" />
    //                         )}
    //                       </button>
    //                     </div>

    //                     {isExpanded && (
    //                       <div className="p-4 space-y-4">
    //                         <div>
    //                           <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
    //                             <Lightbulb className="w-4 h-4 text-yellow-600" />
    //                             Steps to resolve
    //                           </h5>
    //                           <ol className="space-y-2">
    //                             {action.steps.map((step, stepIdx) => (
    //                               <li key={stepIdx} className="flex gap-3">
    //                                 <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-semibold">
    //                                   {stepIdx + 1}
    //                                 </span>
    //                                 <span className="text-gray-700 pt-0.5">{step}</span>
    //                               </li>
    //                             ))}
    //                           </ol>
    //                         </div>

    //                         {action.resources && action.resources.length > 0 && (
    //                           <div>
    //                             <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
    //                               <BookOpen className="w-4 h-4 text-indigo-600" />
    //                               Helpful Resources
    //                             </h5>
    //                             <div className="space-y-2">
    //                               {action.resources.map((resource, resIdx) => {
    //                                 const ResourceIcon = getResourceIcon(resource.type);
    //                                 return (
    //                                   <a
    //                                     key={resIdx}
    //                                     href={resource.url}
    //                                     target="_blank"
    //                                     rel="noopener noreferrer"
    //                                     className="flex items-start gap-3 p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors group"
    //                                   >
    //                                     <ResourceIcon className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
    //                                     <div className="flex-1 min-w-0">
    //                                       <div className="font-medium text-indigo-600 group-hover:text-indigo-700 flex items-center gap-2">
    //                                         {resource.title}
    //                                         <ExternalLink className="w-3 h-3" />
    //                                       </div>
    //                                       <p className="text-sm text-gray-600 mt-1">{resource.relevance}</p>
    //                                     </div>
    //                                   </a>
    //                                 );
    //                               })}
    //                             </div>
    //                           </div>
    //                         )}
    //                       </div>
    //                     )}
    //                   </div>
    //                 );
    //               })}
    //             </div>
    //           </div>
    //         )}

    //         {/* System Health */}
    //         {analysis.system_health && (
    //           <div className="bg-white rounded-xl shadow-lg p-6">
    //             <div className="flex items-center gap-3 mb-6">
    //               <Cpu className="w-6 h-6 text-green-600" />
    //               <h3 className="text-xl font-bold text-gray-900">System Health Overview</h3>
    //             </div>

    //             <p className="text-gray-700 mb-6 leading-relaxed">{analysis.system_health.overall_status}</p>

    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //               {analysis.system_health.concerns?.length > 0 && (
    //                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
    //                   <div className="flex items-center gap-2 mb-3">
    //                     <AlertTriangle className="w-5 h-5 text-yellow-600" />
    //                     <h4 className="font-semibold text-yellow-900">Concerns</h4>
    //                   </div>
    //                   <ul className="space-y-2">
    //                     {analysis.system_health.concerns.map((concern, idx) => (
    //                       <li key={idx} className="text-yellow-800 text-sm flex gap-2">
    //                         <span className="text-yellow-600">•</span>
    //                         <span>{concern}</span>
    //                       </li>
    //                     ))}
    //                   </ul>
    //                 </div>
    //               )}

    //               {analysis.system_health.positive_indicators?.length > 0 && (
    //                 <div className="bg-green-50 border border-green-200 rounded-lg p-4">
    //                   <div className="flex items-center gap-2 mb-3">
    //                     <CheckCircle className="w-5 h-5 text-green-600" />
    //                     <h4 className="font-semibold text-green-900">Positive Indicators</h4>
    //                   </div>
    //                   <ul className="space-y-2">
    //                     {analysis.system_health.positive_indicators.map((indicator, idx) => (
    //                       <li key={idx} className="text-green-800 text-sm flex gap-2">
    //                         <span className="text-green-600">•</span>
    //                         <span>{indicator}</span>
    //                       </li>
    //                     ))}
    //                   </ul>
    //                 </div>
    //               )}
    //             </div>
    //           </div>
    //         )}

    //         {/* Prevention Tips */}
    //         {analysis.prevention_tips && analysis.prevention_tips.length > 0 && (
    //           <div className="bg-white rounded-xl shadow-lg p-6">
    //             <div className="flex items-center gap-3 mb-6">
    //               <Shield className="w-6 h-6 text-blue-600" />
    //               <h3 className="text-xl font-bold text-gray-900">Prevention Tips</h3>
    //             </div>
    //             <ul className="space-y-3">
    //               {analysis.prevention_tips.map((tip, idx) => (
    //                 <li key={idx} className="flex gap-3 text-gray-700">
    //                   <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
    //                   <span>{tip}</span>
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>
    //         )}

    //         {/* Next Monitoring Focus */}
    //         {analysis.next_monitoring_focus && analysis.next_monitoring_focus.length > 0 && (
    //           <div className="bg-white rounded-xl shadow-lg p-6">
    //             <div className="flex items-center gap-3 mb-6">
    //               <Eye className="w-6 h-6 text-purple-600" />
    //               <h3 className="text-xl font-bold text-gray-900">What to Monitor Next</h3>
    //             </div>
    //             <ul className="space-y-3">
    //               {analysis.next_monitoring_focus.map((focus, idx) => (
    //                 <li key={idx} className="flex gap-3 text-gray-700">
    //                   <Target className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
    //                   <span>{focus}</span>
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>
    //         )}

    //         {/* Metadata */}
    //         {analysis.metadata && (
    //           <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-4 border border-gray-200">
    //             <p className="text-sm text-gray-600 text-center">
    //               Analysis completed at {new Date(analysis.metadata.analyzed_at).toLocaleString()} • 
    //               {' '}{analysis.metadata.events_count} events analyzed • 
    //               {' '}Model: {analysis.metadata.model_used}
    //             </p>
    //           </div>
    //         )}
    //       </div>
    //     )}
    //   </div>
    // </div>
//   );
};

export default LogAnalyzer;