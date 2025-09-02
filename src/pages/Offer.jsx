import React, { useState } from 'react';
import { Calendar, FileText, User, MapPin, DollarSign, Clock, Save, Database, Eye } from 'lucide-react';

// Simulated Backend Database
class OfferDatabase {
  constructor() {
    this.offers = [];
    this.nextId = 1;
  }

  // Save new offer
  saveOffer(offerData) {
    const offer = {
      id: this.nextId++,
      ...offerData,
      createdAt: new Date().toISOString(),
      status: 'Draft'
    };
    this.offers.unshift(offer); // Add to beginning of array
    return offer;
  }

  // Get all offers
  getAllOffers() {
    return this.offers;
  }

  // Get offer by ID
  getOfferById(id) {
    return this.offers.find(offer => offer.id === id);
  }

  // Update offer status
  updateOfferStatus(id, status) {
    const offer = this.offers.find(offer => offer.id === id);
    if (offer) {
      offer.status = status;
      offer.updatedAt = new Date().toISOString();
    }
    return offer;
  }

  // Delete offer
  deleteOffer(id) {
    const index = this.offers.findIndex(offer => offer.id === id);
    if (index !== -1) {
      return this.offers.splice(index, 1)[0];
    }
    return null;
  }
}

// Initialize database
const offerDB = new OfferDatabase();

const FreelanceOfferGenerator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('form'); // 'form', 'database', 'preview'
  const [savedOffers, setSavedOffers] = useState([]);
  const [saveStatus, setSaveStatus] = useState('');
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  
  const [formData, setFormData] = useState({
    freelancerName: '',
    freelancerAddress: '',
    position: 'UI/UX Designer',
    projectDescription: 'building a community-driven platform that connects people, businesses, and opportunities within their cities',
    startDate: '',
    endDate: '',
    duration: '8 weeks',
    totalAmount: '600000',
    currency: '₦',
    paymentTerms: '50% to be paid before commencing & 50% scope of works to be delivered within 4 weeks and 50% remaining balance to be paid after 100% completion',
    acceptanceDeadline: '',
    signerName: 'Adekunle Adebanjo',
    signerTitle: 'SEO',
    signerPhone: '07031342626',
    companyName: 'Cities App',
    companyAddress: '13, Shonaike Street Ikosi Ikeja Lagos',
    scopeOfWork: `• Designing user interfaces for mobile (Android, iOS) and web versions of the Cities App
• Creating user flows, wireframes, and high-fidelity prototypes
• Conducting user-centered design iterations based on feedback
• Collaborating with the product and development teams to ensure design consistency and usability`
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    setLoginError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple authentication - you can modify these credentials
    const validCredentials = [
      { username: 'admin', password: 'cities2025' },
      { username: 'cities', password: 'app123' },
      { username: 'hr', password: 'offers2025' }
    ];

    const isValid = validCredentials.some(
      cred => cred.username === loginData.username && cred.password === loginData.password
    );

    if (isValid) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ username: '', password: '' });
    setShowPreview(false);
    setCurrentView('form');
    setSaveStatus('');
  };

  const saveOfferToDatabase = () => {
    try {
      // Validate required fields
      if (!formData.freelancerName || !formData.freelancerAddress || !formData.startDate || !formData.endDate) {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus(''), 3000);
        return;
      }

      // Save to database
      const savedOffer = offerDB.saveOffer({
        ...formData,
        generatedBy: loginData.username,
        totalAmountFormatted: `${formData.currency}${parseInt(formData.totalAmount || 0).toLocaleString()}`
      });

      // Update local state
      setSavedOffers(offerDB.getAllOffers());
      setSaveStatus('success');
      
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const loadSavedOffers = () => {
    setSavedOffers(offerDB.getAllOffers());
    setCurrentView('database');
  };

  const loadOfferFromDatabase = (offer) => {
    setFormData({
      freelancerName: offer.freelancerName,
      freelancerAddress: offer.freelancerAddress,
      position: offer.position,
      projectDescription: offer.projectDescription,
      startDate: offer.startDate,
      endDate: offer.endDate,
      duration: offer.duration,
      totalAmount: offer.totalAmount,
      currency: offer.currency,
      paymentTerms: offer.paymentTerms,
      acceptanceDeadline: offer.acceptanceDeadline,
      signerName: offer.signerName,
      signerTitle: offer.signerTitle,
      signerPhone: offer.signerPhone,
      companyName: offer.companyName,
      companyAddress: offer.companyAddress,
      scopeOfWork: offer.scopeOfWork
    });
    setCurrentView('form');
  };

  const updateOfferStatus = (id, newStatus) => {
    offerDB.updateOfferStatus(id, newStatus);
    setSavedOffers(offerDB.getAllOffers());
  };

  const deleteOffer = (id) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      offerDB.deleteOffer(id);
      setSavedOffers(offerDB.getAllOffers());
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const generateOffer = () => {
    setShowPreview(true);
  };

  const printOffer = () => {
    // Get the offer content
    const offerContent = document.querySelector('.offer-document').innerHTML;
    
    // Create a clean HTML string for printing
    const printHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Freelance_Offer_Letter</title>
        <meta charset="UTF-8">
        <style>
          @page {
            margin: 15mm;
            size: A4;
            @top-center { content: ""; }
            @top-left { content: ""; }
            @top-right { content: ""; }
            @bottom-center { content: ""; }
            @bottom-left { content: ""; }
            @bottom-right { content: ""; }
          }
          @media print {
            @page { margin: 15mm; }
            html, body { 
              margin: 0 !important; 
              padding: 0 !important; 
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            .print-button { display: none !important; }
          }
          body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 12pt;
            line-height: 1.5;
            margin: 0;
            padding: 20px;
            color: #000000;
            background: white;
          }
          .print-button {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            z-index: 1000;
          }
          .print-button:hover {
            background: #0056b3;
          }
          .text-center { text-align: center; }
          .text-lg { font-size: 14pt; }
          .text-2xl { font-size: 18pt; }
          .font-bold { font-weight: bold; }
          .mb-2 { margin-bottom: 8pt; }
          .mb-3 { margin-bottom: 12pt; }
          .mb-4 { margin-bottom: 16pt; }
          .mb-6 { margin-bottom: 24pt; }
          .mb-8 { margin-bottom: 32pt; }
          .mt-2 { margin-top: 8pt; }
          .mt-4 { margin-top: 16pt; }
          .pt-6 { padding-top: 24pt; }
          .border-t { border-top: 1px solid #000; }
          .text-gray-600 { color: #333; }
          .whitespace-pre-line { white-space: pre-line; }
          .flex { display: flex; }
          .justify-between { justify-content: space-between; }
          h1, h2, h3 { color: #000; margin: 16pt 0 12pt 0; }
          p { margin: 6pt 0; color: #000; }
          strong { font-weight: bold; }
        </style>
      </head>
      <body>
        <button class="print-button" onclick="window.print()">Print/Save as PDF</button>
        ${offerContent}
        <script>
          // Auto-focus for better user experience
          window.onload = function() {
            window.focus();
          };
        </script>
      </body>
      </html>
    `;

    // Create blob and object URL
    const blob = new Blob([printHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Open in new window
    const printWindow = window.open(url, '_blank', 'width=900,height=700,scrollbars=yes');
    
    // Cleanup after some time
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 30000); // 30 seconds cleanup
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <FileText className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Cities App</h1>
            <h2 className="text-lg text-gray-600">Offer Letter Generator</h2>
            <p className="text-sm text-gray-500 mt-2">Please login to access the system</p>
          </div>

          <div onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={loginData.username}
                onChange={handleLoginChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{loginError}</p>
              </div>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Login to System
            </button>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Demo Credentials:</p>
            <div className="text-xs text-gray-500 space-y-1">
              <div>Username: <span className="font-mono">admin</span> | Password: <span className="font-mono">cities2025</span></div>
              <div>Username: <span className="font-mono">cities</span> | Password: <span className="font-mono">app123</span></div>
              <div>Username: <span className="font-mono">hr</span> | Password: <span className="font-mono">offers2025</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Database View
  if (currentView === 'database') {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white">
        <div className="mb-8 flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <Database className="text-green-600" />
              Saved Offers Database
            </h1>
            <p className="text-gray-600">View, manage and track all generated offer letters.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setCurrentView('form')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <FileText size={16} />
              New Offer
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">
              All Offers ({savedOffers.length})
            </h2>
          </div>
          
          {savedOffers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Database size={48} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">No offers saved yet</h3>
              <p className="mb-4">Create your first offer letter to see it here.</p>
              <button
                onClick={() => setCurrentView('form')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Create New Offer
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Freelancer</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Position</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Created</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {savedOffers.map((offer, index) => (
                    <tr key={offer.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm text-gray-900 font-mono">#{offer.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{offer.freelancerName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{offer.position}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 font-semibold">{offer.totalAmountFormatted}</td>
                      <td className="px-4 py-3 text-sm">
                        <select
                          value={offer.status}
                          onChange={(e) => updateOfferStatus(offer.id, e.target.value)}
                          className={`px-2 py-1 rounded text-xs font-medium border-0 ${
                            offer.status === 'Draft' ? 'bg-gray-100 text-gray-700' :
                            offer.status === 'Sent' ? 'bg-blue-100 text-blue-700' :
                            offer.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                            offer.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          <option value="Draft">Draft</option>
                          <option value="Sent">Sent</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Expired">Expired</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(offer.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-1">
                          <button
                            onClick={() => loadOfferFromDatabase(offer)}
                            className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                            title="Load & Edit"
                          >
                            <Eye size={12} />
                          </button>
                          <button
                            onClick={() => deleteOffer(offer.id)}
                            className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                            title="Delete"
                          >
                            ×
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Database Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div>
              <p className="text-blue-600">Total Offers</p>
              <p className="font-bold text-blue-800">{savedOffers.length}</p>
            </div>
            <div>
              <p className="text-blue-600">Draft</p>
              <p className="font-bold text-blue-800">{savedOffers.filter(o => o.status === 'Draft').length}</p>
            </div>
            <div>
              <p className="text-blue-600">Sent</p>
              <p className="font-bold text-blue-800">{savedOffers.filter(o => o.status === 'Sent').length}</p>
            </div>
            <div>
              <p className="text-blue-600">Accepted</p>
              <p className="font-bold text-blue-800">{savedOffers.filter(o => o.status === 'Accepted').length}</p>
            </div>
            <div>
              <p className="text-blue-600">Total Value</p>
              <p className="font-bold text-blue-800">
                ₦{savedOffers.reduce((sum, offer) => sum + parseInt(offer.totalAmount || 0), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showPreview) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white">
        <div className="no-print mb-6 flex gap-4 flex-wrap">
          <button
            onClick={() => setShowPreview(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Back to Form
          </button>
          <button
            onClick={printOffer}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Print/Save as PDF
          </button>
          <button
            onClick={saveOfferToDatabase}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
          >
            <Save size={16} />
            Save to Database
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {saveStatus === 'success' && (
          <div className="no-print mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700">✓ Offer saved successfully to database!</p>
          </div>
        )}

        {saveStatus === 'error' && (
          <div className="no-print mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">✗ Error saving offer. Please check required fields.</p>
          </div>
        )}

        <div className="offer-document" style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">{formData.companyName}</h1>
            <p className="text-gray-600">{formData.companyAddress}</p>
            <p className="text-gray-600">{formatDate(new Date())}</p>
          </div>

          <div className="mb-6">
            <p>{formData.freelancerName}</p>
            <p className="whitespace-pre-line">{formData.freelancerAddress}</p>
          </div>

          <div className="mb-6">
            <p><strong>Subject: Freelance {formData.position} Offer with {formData.companyName}</strong></p>
          </div>

          <div className="mb-6">
            <p>Dear {formData.freelancerName},</p>
            <p className="mt-4">
              We are excited to extend to you an offer to collaborate with {formData.companyName} as a Freelance {formData.position}. 
              Your design expertise and creative problem-solving align with our mission of {formData.projectDescription}.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">Scope of Work</h3>
            <p>As a Freelance {formData.position}, you will be responsible for:</p>
            <div className="mt-2 whitespace-pre-line">{formData.scopeOfWork}</div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">Timeline - {formData.duration}</h3>
            <p>
              This engagement will begin on {formatDate(formData.startDate)} and continue until {formatDate(formData.endDate)}, 
              unless extended or terminated by either party. Specific milestones and timelines will be agreed upon before project commencement.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">Compensation</h3>
            <p><strong>Rate:</strong> {formData.currency}{parseInt(formData.totalAmount).toLocaleString()} [{formData.paymentTerms}]</p>
            <p><strong>Contract Timeline:</strong> {formData.duration}</p>
            <p><strong>Payment Terms:</strong> Payments will be made via Bank Transfer within days of invoice approval after each milestone/deliverable or as agreed</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">Independent Contractor Status</h3>
            <p>
              This engagement does not constitute employment. As a freelancer, you are responsible for managing your own taxes, 
              insurance, and statutory obligations. You will not be entitled to company employee benefits.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">Confidentiality & Ownership</h3>
            <p>
              All designs, assets, and materials created for {formData.companyName} under this agreement shall be the sole property of the company. 
              You agree to maintain strict confidentiality regarding any project-related information, both during and after the engagement.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">Termination</h3>
            <p>
              Either party may terminate this agreement with 7 days written notice. Compensation will be provided for approved work 
              completed up to the termination date.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold mb-3">Acceptance of Offer</h3>
            <p>
              If you agree to the terms of this freelance engagement, please sign and return a copy of this letter by {formatDate(formData.acceptanceDeadline)}.
            </p>
            <p className="mt-4">
              We are eager to see your creative impact on {formData.companyName} and look forward to working with you to design an engaging experience for our users.
            </p>
          </div>

          <div className="mb-8">
            <p>Sincerely,</p>
            <p className="mt-4"><strong>{formData.signerName}</strong></p>
            <p>{formData.signerTitle}/{formData.signerPhone}</p>
            <p>{formData.companyName}</p>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-bold mb-4">Acknowledgement and Acceptance</h3>
            <p className="mb-8">I, __________________ accept this freelance offer as a {formData.position} for {formData.companyName} under the terms stated above.</p>
            <div className="flex justify-between">
              <div>
                <p>Signature: ________________________</p>
              </div>
              <div>
                <p>Date: ____________________________</p>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @media print {
            .no-print {
              display: none;
            }
            body {
              margin: 0;
              padding: 20px;
            }
            .offer-document {
              max-width: none;
              margin: 0;
              padding: 0;
            }
          }
          @page {
            margin: 0.5in;
            @top-center { content: none; }
            @top-left { content: none; }
            @top-right { content: none; }
            @bottom-center { content: none; }
            @bottom-left { content: none; }
            @bottom-right { content: none; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8 flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <FileText className="text-blue-600" />
            Freelance Offer Letter Generator
          </h1>
          <p className="text-gray-600">Create professional freelance offer letters with customizable terms and conditions.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={loadSavedOffers}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <Database size={16} />
            View Database ({offerDB.getAllOffers().length})
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {saveStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 flex items-center gap-2">
            <Save size={16} />
            ✓ Offer saved successfully to database!
          </p>
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">✗ Error saving offer. Please check required fields.</p>
        </div>
      )}

      <div className="space-y-8">
        {/* Company Information */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Cities App"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Address</label>
              <textarea
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleInputChange}
                rows={2}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="13, Shonaike Street Ikosi Ikeja Lagos"
              />
            </div>
          </div>
        </div>

        {/* Freelancer Information */}
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-green-800 flex items-center gap-2">
            <User size={20} />
            Freelancer Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Freelancer Full Name</label>
              <input
                type="text"
                name="freelancerName"
                value={formData.freelancerName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="UI/UX Designer"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <MapPin size={16} />
              Freelancer Address
            </label>
            <textarea
              name="freelancerAddress"
              value={formData.freelancerAddress}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="123 Main Street&#10;Lagos, Nigeria"
              required
            />
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-purple-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-purple-800">Project Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
              <textarea
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleInputChange}
                rows={2}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="building a community-driven platform..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Scope of Work</label>
              <textarea
                name="scopeOfWork"
                value={formData.scopeOfWork}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="• Designing user interfaces...&#10;• Creating user flows..."
              />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-orange-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-orange-800 flex items-center gap-2">
            <Clock size={20} />
            Timeline & Dates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="8 weeks"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Acceptance Deadline</label>
            <input
              type="date"
              name="acceptanceDeadline"
              value={formData.acceptanceDeadline}
              onChange={handleInputChange}
              className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Compensation */}
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800 flex items-center gap-2">
            <DollarSign size={20} />
            Compensation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="₦">₦ (Naira)</option>
                <option value="$">$ (USD)</option>
                <option value="€">€ (Euro)</option>
                <option value="£">£ (GBP)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount</label>
              <input
                type="number"
                name="totalAmount"
                value={formData.totalAmount}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="600000"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Terms</label>
            <textarea
              name="paymentTerms"
              value={formData.paymentTerms}
              onChange={handleInputChange}
              rows={2}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="50% upfront, 50% on completion"
            />
          </div>
        </div>

        {/* Signatory Information */}
        <div className="bg-red-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-red-800">Signatory Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Signer Name</label>
              <input
                type="text"
                name="signerName"
                value={formData.signerName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Adekunle Adebanjo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="signerTitle"
                value={formData.signerTitle}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="SEO"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="signerPhone"
                value={formData.signerPhone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="07031342626"
              />
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center gap-4 pt-6 flex-wrap">
          <button
            type="button"
            onClick={saveOfferToDatabase}
            disabled={!formData.freelancerName || !formData.freelancerAddress || !formData.startDate || !formData.endDate || !formData.totalAmount}
            className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
          >
            <Save size={20} />
            Save to Database
          </button>
          
          <button
            type="button"
            onClick={generateOffer}
            disabled={!formData.freelancerName || !formData.freelancerAddress || !formData.startDate || !formData.endDate || !formData.totalAmount}
            className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
          >
            <FileText size={20} />
            Preview & Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreelanceOfferGenerator;