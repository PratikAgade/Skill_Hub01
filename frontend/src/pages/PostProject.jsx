import React, { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';
const PostProject = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const { id } = useParams();  
    const isEditMode = !!id;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Web Development',
        budgetType: 'fixed',
        budget: '',
        duration: 'Less than 1 month'
    });
    React.useEffect(() => {
        if (isEditMode) {
            const fetchProject = async () => {
                try {
                    setLoading(true);
                    const res = await api.get(`/projects/${id}`);
                    setFormData({
                        title: res.data.title,
                        description: res.data.description,
                        category: res.data.category,
                        budgetType: res.data.budgetType,
                        budget: res.data.budget,
                        duration: res.data.duration
                    });
                } catch (err) {
                    setError("Failed to load project details");
                } finally {
                    setLoading(false);
                }
            };
            fetchProject();
        }
    }, [id, isEditMode]);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            if (isEditMode) {
                await api.put(`/projects/${id}`, formData);
            } else {
                await api.post('/projects', formData);
            }
            navigate('/client/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Error saving project');
            setLoading(false);
        }
    };
    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{isEditMode ? 'Edit Project' : 'Post a new project'}</h1>
                <p className="text-gray-500">{isEditMode ? 'Update your project details below.' : "Let's get the details so we can match you with the right talent."}</p>
            </div>
            { }
            <div className={`bg-gray-100 rounded-full h-2 mb-12 overflow-hidden ${loading && isEditMode ? 'animate-pulse' : ''}`}>
                <div className="bg-emerald-600 h-full transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                        {error}
                    </div>
                )}
                { }
                {step === 1 && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="e.g. Build a Responsive WordPress Site"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                rows={6}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Describe your project requirements in detail..."
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                            >
                                <option>Web Development</option>
                                <option>Graphic Design</option>
                                <option>Digital Marketing</option>
                            </select>
                        </div>
                    </div>
                )}
                { }
                {step === 2 && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Type</label>
                                <div className="flex gap-4">
                                    <label className={`border p-4 rounded-lg flex-1 cursor-pointer hover:border-emerald-500 ${formData.budgetType === 'fixed' ? 'border-emerald-500 bg-emerald-50' : ''}`}>
                                        <input
                                            type="radio"
                                            name="budgetType"
                                            value="fixed"
                                            checked={formData.budgetType === 'fixed'}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        <span className="block font-semibold">Fixed Price</span>
                                    </label>
                                    <label className={`border p-4 rounded-lg flex-1 cursor-pointer hover:border-emerald-500 ${formData.budgetType === 'hourly' ? 'border-emerald-500 bg-emerald-50' : ''}`}>
                                        <input
                                            type="radio"
                                            name="budgetType"
                                            value="hourly"
                                            checked={formData.budgetType === 'hourly'}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        <span className="block font-semibold">Hourly</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                                <input
                                    type="number"
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Project Duration</label>
                            <select
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                            >
                                <option>Less than 1 month</option>
                                <option>1 to 3 months</option>
                                <option>3 to 6 months</option>
                            </select>
                        </div>
                    </div>
                )}
                { }
                {step === 3 && (
                    <div className="space-y-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition cursor-pointer">
                            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 font-medium">Drag & drop files here or click to browse</p>
                            <p className="text-xs text-gray-400 mt-2">PDF, Images, Docx (Max 10MB)</p>
                        </div>
                    </div>
                )}
                { }
                <div className="flex justify-between mt-8 pt-8 border-t border-gray-100">
                    {step > 1 ? (
                        <button onClick={() => setStep(s => s - 1)} className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition">Back</button>
                    ) : (
                        <div></div>
                    )}
                    {step < 3 ? (
                        <button onClick={() => setStep(s => s + 1)} className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition">Continue</button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 disabled:opacity-50 flex items-center"
                        >
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            {isEditMode ? 'Save Changes' : 'Post Project'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default PostProject;