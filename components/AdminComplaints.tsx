import React, { useState, useEffect } from 'react';

const AdminComplaints = ({ authToken }: { authToken: string }) => {
    const [monthEnding, setMonthEnding] = useState('MARCH - 2026');
    const [monthlyData, setMonthlyData] = useState([
        { source: 'Directly from investor', pendingLastMonth: 'Nil', received: 'Nil', resolved: 'N.A', totalPending: 'Nil', pendingGt3Months: 'Nil', avgResolutionTime: 'N.A' },
        { source: 'SEBI (SCORES)', pendingLastMonth: 'Nil', received: 'Nil', resolved: 'N.A', totalPending: 'Nil', pendingGt3Months: 'Nil', avgResolutionTime: 'N.A' },
        { source: 'Other Sources (if any)', pendingLastMonth: 'Nil', received: 'Nil', resolved: 'N.A', totalPending: 'Nil', pendingGt3Months: 'Nil', avgResolutionTime: 'N.A' },
        { source: 'Grand Total', pendingLastMonth: 'Nil', received: 'Nil', resolved: 'N.A', totalPending: 'Nil', pendingGt3Months: 'Nil', avgResolutionTime: 'N.A' }
    ]);

    const [monthlyTrend, setMonthlyTrend] = useState([
        { sr: 1, month: 'MARCH - 2026', carriedForward: 'NIL', received: 'NIL', resolved: 'N.A', pending: 'N.A' },
        { sr: 2, month: 'FEB - 2026', carriedForward: 'NIL', received: 'NIL', resolved: 'N.A', pending: 'N.A' },
        { sr: 3, month: 'JAN - 2026', carriedForward: 'NIL', received: 'NIL', resolved: 'N.A', pending: 'N.A' },
        { sr: 4, month: 'Grand Total', carriedForward: 'NIL', received: 'NIL', resolved: 'N.A', pending: 'N.A' }
    ]);

    const [annualDisposal, setAnnualDisposal] = useState([
        { sr: 1, year: '2025-26', carriedForward: 'NIL', received: 'NIL', resolved: 'N.A', pending: 'N.A' },
        { sr: 2, year: '2026-27', carriedForward: 'NIL', received: 'NIL', resolved: 'N.A', pending: 'N.A' },
        { sr: 3, year: 'Grand Total', carriedForward: 'NIL', received: 'NIL', resolved: 'N.A', pending: 'N.A' }
    ]);

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch('/api/settings/complaints', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    let parsedData = data;
                    if (typeof data === 'string') {
                        try { parsedData = JSON.parse(data); } catch(e) {}
                    }
                    setMonthEnding(parsedData.monthEnding || 'MARCH - 2026');
                    setMonthlyData(parsedData.monthlyData || monthlyData);
                    setMonthlyTrend(parsedData.monthlyTrend || monthlyTrend);
                    setAnnualDisposal(parsedData.annualDisposal || annualDisposal);
                }
            })
            .catch(err => console.error("Could not fetch settings", err));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/admin/settings/complaints', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({ monthEnding, monthlyData, monthlyTrend, annualDisposal })
            });
            if (res.ok) {
                alert('Complaints data saved successfully!');
            } else {
                alert('Failed to save complaints data.');
            }
        } catch(e: any) {
            alert(e.message);
        } finally {
            setSaving(false);
        }
    };

    const updateMonthlyData = (index: number, field: string, value: string) => {
        const newData = [...monthlyData];
        (newData[index] as any)[field] = value;
        setMonthlyData(newData);
    };

    const updateMonthlyTrend = (index: number, field: string, value: string) => {
        const newData = [...monthlyTrend];
        (newData[index] as any)[field] = value;
        setMonthlyTrend(newData);
    };

    const updateAnnualDisposal = (index: number, field: string, value: string) => {
        const newData = [...annualDisposal];
        (newData[index] as any)[field] = value;
        setAnnualDisposal(newData);
    };

    return (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Complaints Data Edit</h2>
                <button onClick={handleSave} disabled={saving} className="bg-brand-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-700 transition">
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-1">Month Ending Header Title</label>
                <input type="text" value={monthEnding} onChange={e => setMonthEnding(e.target.value)} className="w-full sm:w-1/2 p-2 border border-slate-300 rounded-md" />
            </div>

            {/* Table 1 */}
            <div className="mb-8">
                <h3 className="font-semibold text-lg text-slate-700 mb-3">1. Number Of Client's Complaints</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs text-left border">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="p-2 border">Source</th>
                                <th className="p-2 border">Pending Last Month</th>
                                <th className="p-2 border">Received</th>
                                <th className="p-2 border">Resolved</th>
                                <th className="p-2 border">Total Pending</th>
                                <th className="p-2 border">Pending &gt; 3 mnths</th>
                                <th className="p-2 border">Avg Res Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthlyData.map((row, i) => (
                                <tr key={i}>
                                    <td className="p-2 border font-medium">{row.source}</td>
                                    {['pendingLastMonth', 'received', 'resolved', 'totalPending', 'pendingGt3Months', 'avgResolutionTime'].map(field => (
                                        <td key={field} className="p-2 border">
                                            <input type="text" className="w-full p-1 border rounded" value={(row as any)[field]} onChange={e => updateMonthlyData(i, field, e.target.value)} />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Table 2 */}
            <div className="mb-8">
                <h3 className="font-semibold text-lg text-slate-700 mb-3">2. Trend of Monthly Disposal</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs text-left border">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="p-2 border">Sr</th>
                                <th className="p-2 border">Month</th>
                                <th className="p-2 border">Carried Forward</th>
                                <th className="p-2 border">Received</th>
                                <th className="p-2 border">Resolved</th>
                                <th className="p-2 border">Pending</th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthlyTrend.map((row, i) => (
                                <tr key={i}>
                                    <td className="p-2 border font-medium">{row.sr}</td>
                                    <td className="p-2 border"><input type="text" className="w-full p-1 border rounded" value={row.month} onChange={e => updateMonthlyTrend(i, 'month', e.target.value)} /></td>
                                    <td className="p-2 border"><input type="text" className="w-full p-1 border rounded" value={row.carriedForward} onChange={e => updateMonthlyTrend(i, 'carriedForward', e.target.value)} /></td>
                                    <td className="p-2 border"><input type="text" className="w-full p-1 border rounded" value={row.received} onChange={e => updateMonthlyTrend(i, 'received', e.target.value)} /></td>
                                    <td className="p-2 border"><input type="text" className="w-full p-1 border rounded" value={row.resolved} onChange={e => updateMonthlyTrend(i, 'resolved', e.target.value)} /></td>
                                    <td className="p-2 border"><input type="text" className="w-full p-1 border rounded" value={row.pending} onChange={e => updateMonthlyTrend(i, 'pending', e.target.value)} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Table 3 */}
            <div className="mb-8">
                <h3 className="font-semibold text-lg text-slate-700 mb-3">3. Annual Disposal</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs text-left border">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="p-2 border">Sr</th>
                                <th className="p-2 border">Year</th>
                                <th className="p-2 border">Carried Forward</th>
                                <th className="p-2 border">Received</th>
                                <th className="p-2 border">Resolved</th>
                                <th className="p-2 border">Pending</th>
                            </tr>
                        </thead>
                        <tbody>
                            {annualDisposal.map((row, i) => (
                                <tr key={i}>
                                    <td className="p-2 border font-medium">{row.sr}</td>
                                    <td className="p-2 border"><input type="text" className="w-full p-1 border rounded" value={row.year} onChange={e => updateAnnualDisposal(i, 'year', e.target.value)} /></td>
                                    <td className="p-2 border"><input type="text" className="w-full p-1 border rounded" value={row.carriedForward} onChange={e => updateAnnualDisposal(i, 'carriedForward', e.target.value)} /></td>
                                    <td className="p-2 border"><input type="text" className="w-full p-1 border rounded" value={row.received} onChange={e => updateAnnualDisposal(i, 'received', e.target.value)} /></td>
                                    <td className="p-2 border"><input type="text" className="w-full p-1 border rounded" value={row.resolved} onChange={e => updateAnnualDisposal(i, 'resolved', e.target.value)} /></td>
                                    <td className="p-2 border"><input type="text" className="w-full p-1 border rounded" value={row.pending} onChange={e => updateAnnualDisposal(i, 'pending', e.target.value)} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default AdminComplaints;
