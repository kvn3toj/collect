/**
 * Centralizado de iconos para la aplicación
 * Migración gradual de lucide-react a @mui/icons-material
 * 
 * Este archivo proporciona un lugar centralizado para importar iconos,
 * lo que facilita cambiar de una biblioteca a otra sin tener que modificar
 * muchos archivos en todo el proyecto.
 */

// Importaciones de Material UI Icons
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

// Exportaciones con nombres coincidentes a lucide-react
export const X = CloseOutlinedIcon;
export const FilterList = FilterListOutlinedIcon;
export const SortOutlined = SortOutlinedIcon;
export const Search = SearchOutlinedIcon;
export const ShoppingBag = ShoppingBagOutlinedIcon;
export const User = PersonOutlineOutlinedIcon;
export const Menu = MenuOutlinedIcon;
export const Heart = FavoriteBorderOutlinedIcon;
export const Close = CloseOutlinedIcon; // Alias para X
export const Instagram = InstagramIcon;
export const Facebook = FacebookIcon;
export const Twitter = TwitterIcon;
export const Dashboard = DashboardOutlinedIcon;
export const Inventory = InventoryOutlinedIcon;
export const People = PeopleOutlineOutlinedIcon;
export const Settings = SettingsOutlinedIcon;
export const LogOut = LogoutOutlinedIcon;
export const Eye = VisibilityOutlinedIcon;
export const EyeOff = VisibilityOffOutlinedIcon;
export const UserPlus = PersonAddOutlinedIcon;
export const Edit = EditOutlinedIcon;
export const Trash2 = DeleteOutlineOutlinedIcon;
export const Plus = AddOutlinedIcon;
export const Minus = RemoveOutlinedIcon;
export const ArrowLeft = ArrowBackOutlinedIcon;
export const ArrowRight = ArrowForwardOutlinedIcon;
export const Save = SaveOutlinedIcon;
export const ShoppingCart = ShoppingCartOutlinedIcon;
export const Mail = EmailOutlinedIcon;
export const Lock = LockOutlinedIcon;
export const LogIn = LoginOutlinedIcon;
export const Truck = LocalShippingOutlinedIcon;
export const Shield = SecurityOutlinedIcon;
export const Home = HomeOutlinedIcon;
export const CreditCard = CreditCardOutlinedIcon;
export const Check = CheckOutlinedIcon;

// Exportar componentes con tamaño ajustado para coincidir visualmente con lucide-react
// Esto ayuda a que los tamaños sean consistentes en la migración
export const iconProps = {
  fontSize: 'small',
  style: { width: '1.2em', height: '1.2em' }
};

// Ejemplo de uso:
// import { Search, iconProps } from '../utils/icons';
// <Search {...iconProps} /> 