import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { useEffect } from "react"
import { photoPlaceholderSrc } from "../services/MainAPI";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();

  useEffect(() => {
    if (!userProfile) {
      navigate("/login");
    }
    console.log(userProfile)
  }, []);

  if (!userProfile) return null; // ще нічого не рендеримо, поки юзер не завантажений

  return (
    <main>
      <div className="flex flex-col px-24">
        <section className="flex my-12 flex-col">
          {/* --- Розширений блок профілю --- */}
          <div className="flex flex-col gap-6 p-4 pb-10 bg-[#7575754c]">
            {/* Аватар та базова інформація */}
            <div className="flex items-center gap-6">
              <img
                  src={userProfile.avatarSrc || photoPlaceholderSrc}
                  alt="avatar"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                />
              <div>
                <h2 className="text-2xl font-bold">{userProfile.username}</h2>
                <p className="text-gray-600">{userProfile.email}</p>
              </div>
            </div>

            {/* Позиції користувача
            <div>
              <h3 className="text-lg font-semibold mb-3">Позиції у країнах</h3>
              {userProfile.positions.length === 0 ? (
                <p className="text-gray-500">Немає активних позицій</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userProfile.positions.map((pos) => (
                    <div
                      key={pos.country.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={pos.country.flagSrc}
                          alt={pos.country.name + " flag"}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <h4 className="font-semibold">{pos.country.name}</h4>
                      </div>
                      <p className="text-gray-600 mb-1">
                        <span className="font-semibold">Роль: </span>
                        {pos.role}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Закони: {pos.country.lawCount} | Локація: {pos.country.location.universe.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Реалізації інститутів</h3>
              {userProfile.positions.some((p) => p.country.implementations.length > 0) ? (
                <div className="flex flex-col gap-4">
                  {userProfile.positions.map((pos) =>
                    pos.country.implementations.map((impl) => (
                      <div
                        key={impl.id}
                        className="p-3 bg-gray-100 rounded-md border-l-4 border-blue-400"
                      >
                        <p className="font-semibold">{impl.institute.name}</p>
                        <p className="text-gray-600 text-sm">{impl.law.text}</p>
                        <p className="text-gray-500 text-xs">
                          Поточний рейтинг: {impl.currentRate}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <p className="text-gray-500">Немає реалізацій</p>
              )}
            </div> */}
          </div>
        </section>
      </div>
    </main>
  );
}