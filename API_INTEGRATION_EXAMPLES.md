# API Integration Examples

This document shows how to integrate the API service layer into your React components.

## Example 1: Using Auth Context

```typescript
import { useAuth } from '@/contexts/AuthContext';

export function MyComponent() {
  const { user, isAuthenticated, login, logout, isLoading } = useAuth();

  const handleLogin = async () => {
    try {
      await login('user@example.com', 'password');
      // Auto-redirect or show success
    } catch (error) {
      // Error already shown in context
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          Welcome, {user?.firstName}!
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

## Example 2: Fetching Data List

```typescript
import { useEffect, useState } from 'react';
import { speakerAPI } from '@/services/api';

interface Speaker {
  id: string;
  name: string;
  email: string;
  bio: string;
}

export function SpeakersListPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        setIsLoading(true);
        const data = await speakerAPI.getAll();
        setSpeakers(data);
      } catch (err: any) {
        setError(err.data?.error || 'Failed to load speakers');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  if (isLoading) return <div>Loading speakers...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Keynote Speakers</h1>
      <div className="grid grid-cols-3 gap-4">
        {speakers.map(speaker => (
          <div key={speaker.id} className="card">
            <h3>{speaker.name}</h3>
            <p>{speaker.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Example 3: Creating Data

```typescript
import { useState } from 'react';
import { paperAPI } from '@/services/api';

export function SubmitPaperPage() {
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    keywords: '',
    pdf_url: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await paperAPI.submit(formData);
      setSuccess(true);
      // Reset form
      setFormData({
        title: '',
        abstract: '',
        keywords: '',
        pdf_url: ''
      });
      // Show success message
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.data?.error || 'Failed to submit paper');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">Paper submitted successfully!</div>}

      <input
        type="text"
        placeholder="Paper Title"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        required
        disabled={isLoading}
      />

      <textarea
        placeholder="Abstract"
        value={formData.abstract}
        onChange={(e) => setFormData({...formData, abstract: e.target.value})}
        required
        disabled={isLoading}
      />

      <input
        type="text"
        placeholder="Keywords (comma separated)"
        value={formData.keywords}
        onChange={(e) => setFormData({...formData, keywords: e.target.value})}
        disabled={isLoading}
      />

      <input
        type="url"
        placeholder="PDF URL"
        value={formData.pdf_url}
        onChange={(e) => setFormData({...formData, pdf_url: e.target.value})}
        disabled={isLoading}
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit Paper'}
      </button>
    </form>
  );
}
```

## Example 4: Updating Data

```typescript
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { reviewerAPI } from '@/services/api';

export function EditReviewerPage() {
  const { id } = useParams<{ id: string }>();
  const [reviewer, setReviewer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviewer = async () => {
      try {
        const data = await reviewerAPI.getById(id!);
        setReviewer(data);
      } catch (err: any) {
        setError(err.data?.error || 'Failed to load reviewer');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchReviewer();
  }, [id]);

  const handleSave = async (updatedData: any) => {
    setIsSaving(true);
    try {
      const result = await reviewerAPI.update(id!, updatedData);
      setReviewer(result);
      // Show success
    } catch (err: any) {
      setError(err.data?.error || 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSave(reviewer);
    }}>
      {/* Form fields */}
      <button type="submit" disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
```

## Example 5: Deleting Data

```typescript
import { useState } from 'react';
import { committeeAPI } from '@/services/api';

export function CommitteeItem({ committee, onDelete }: any) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this committee?')) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await committeeAPI.delete(committee.id);
      onDelete(committee.id);
      // Show success
    } catch (err: any) {
      setError(err.data?.error || 'Failed to delete');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <h3>{committee.name}</h3>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="danger"
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}
```

## Example 6: Form with File Upload

```typescript
import { useState } from 'react';
import { paperAPI } from '@/services/api';

export function PaperSubmissionForm() {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    keywords: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    // Upload file first to get URL (example)
    const formDataForUpload = new FormData();
    formDataForUpload.append('file', file);

    // Upload to backend or storage service
    const fileResponse = await fetch('/api/upload', {
      method: 'POST',
      body: formDataForUpload
    });

    const { pdf_url } = await fileResponse.json();

    setIsLoading(true);
    try {
      await paperAPI.submit({
        ...formData,
        pdf_url
      });
      // Show success
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        required
      />

      <button type="submit" disabled={isLoading || !file}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

## Example 7: Pagination

```typescript
import { useEffect, useState } from 'react';
import { registrationAPI } from '@/services/api';

export function ParticipantsListPage() {
  const [participants, setParticipants] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchParticipants = async () => {
      setIsLoading(true);
      try {
        // Note: Update API to support pagination
        const data = await registrationAPI.getAll();
        setParticipants(data.slice((page - 1) * pageSize, page * pageSize));
        setTotal(data.length);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParticipants();
  }, [page, pageSize]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
      {/* List content */}
      <div className="pagination">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span>Page {page} of {totalPages}</span>

        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

## Example 8: Search & Filter

```typescript
import { useEffect, useState } from 'react';
import { paperAPI } from '@/services/api';

export function PapersSearchPage() {
  const [papers, setPapers] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPapers = async () => {
      setIsLoading(true);
      try {
        let data = await paperAPI.getAll();

        // Filter on client side (or implement server-side filtering)
        if (search) {
          data = data.filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase())
          );
        }

        if (status) {
          data = data.filter(p => p.status === status);
        }

        setPapers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search
    const timer = setTimeout(() => {
      fetchPapers();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, status]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Statuses</option>
        <option value="draft">Draft</option>
        <option value="submitted">Submitted</option>
        <option value="approved">Approved</option>
      </select>

      {isLoading && <div>Loading...</div>}

      <div className="papers-grid">
        {papers.map(paper => (
          <div key={paper.id} className="paper-card">
            <h3>{paper.title}</h3>
            <p>{paper.abstract}</p>
            <span className="status">{paper.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Error Handling Best Practices

```typescript
// Always wrap API calls in try-catch
try {
  const data = await someAPI.getData();
  // Handle success
} catch (error: any) {
  // API error structure:
  // error.status - HTTP status code
  // error.data - Response body with error details
  // error.message - Error message

  if (error.status === 401) {
    // Unauthorized - redirect to login
    window.location.href = "/admin/login";
  } else if (error.status === 403) {
    // Forbidden - insufficient permissions
    setError("You do not have permission to perform this action");
  } else if (error.status === 404) {
    // Not found
    setError("Resource not found");
  } else if (error.status === 500) {
    // Server error
    setError("Server error. Please try again later");
  } else {
    // Generic error
    setError(error.data?.error || error.message || "An error occurred");
  }
}
```

## Loading States

```typescript
function MyComponent() {
  const [isLoading, setIsLoading] = useState(false);

  // Show skeleton loader while loading
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  return <div>{/* Your content */}</div>;
}
```

## Best Practices

1. **Always show loading states** - Use spinners or skeletons
2. **Handle all error cases** - Show meaningful error messages
3. **Use try-catch blocks** - Never leave promises unhandled
4. **Debounce search** - Avoid too many API requests
5. **Cache data when possible** - Don't refetch unnecessarily
6. **Validate before submit** - Reduce server errors
7. **Show success feedback** - Toast notifications
8. **Disable buttons while loading** - Prevent double submissions
9. **Request permission before delete** - Confirm destructive actions
10. **Lazy load data** - Use pagination and pagination

---

**More examples and patterns coming soon!**
