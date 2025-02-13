PGDMP  5    .                |         	   taskonedb    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16398 	   taskonedb    DATABASE     }   CREATE DATABASE taskonedb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE taskonedb;
                postgres    false            �            1259    16418    logs    TABLE     �   CREATE TABLE public.logs (
    id integer NOT NULL,
    userid character varying(30),
    action text,
    createdat timestamp without time zone
);
    DROP TABLE public.logs;
       public         heap    postgres    false            �            1259    16417    logs_id_seq    SEQUENCE     �   CREATE SEQUENCE public.logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.logs_id_seq;
       public          postgres    false    218            �           0    0    logs_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.logs_id_seq OWNED BY public.logs.id;
          public          postgres    false    217            �            1259    16409    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying(30),
    email character varying(30),
    password text,
    age integer
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16408    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            V           2604    16421    logs id    DEFAULT     b   ALTER TABLE ONLY public.logs ALTER COLUMN id SET DEFAULT nextval('public.logs_id_seq'::regclass);
 6   ALTER TABLE public.logs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            U           2604    16412    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �          0    16418    logs 
   TABLE DATA           =   COPY public.logs (id, userid, action, createdat) FROM stdin;
    public          postgres    false    218   p       �          0    16409    users 
   TABLE DATA           @   COPY public.users (id, login, email, password, age) FROM stdin;
    public          postgres    false    216   �       �           0    0    logs_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.logs_id_seq', 10, true);
          public          postgres    false    217            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 7, true);
          public          postgres    false    215            Z           2606    16425    logs logs_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.logs DROP CONSTRAINT logs_pkey;
       public            postgres    false    218            X           2606    16416    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            �   p   x�����0�wU� ��l�Zh&��h�DAD�HZXw��Y�v�;�'|��i�B�n����gEm�Klm6U�J*{I��N�D)�]�:D�^h�����7��OZԻ�iL�'��K�      �   �  x�]�˖c@ ��5ϑu)��n�0!�rfCD2��Py�z�6��;?G�/P���S��P+.]Aa%J�!y�̶����R@�Z�FL��Գ���up�c�D��MqF�%��vYAm#�c}t1�vH��a��s�1���ҡ&&_��zX��?T�D�Y�j��aj��\�J�����'�Ɓ���S�ɢ%�j[�Fx�~�d�ͫi�?+Ϯ�t���w�2�-��T	 -�7�;F	��f|���@�������J_.�ai	�Z��4޿]��(�h��#������/du��{:`�����`v�?o��[������Q'����5�E����5?֊[�~^���E�la�������z��\��n߄����I.Iae�Q_�i0"#7;$�]����]��ոG����7�i�/ő�]     